import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../AuthProvider";
import { Artist, TrackInfo } from "../../diary/MusicModal";
import * as S from "../Styles/SongPage.style";

const LikeSongPage: React.FC = () => {
  const { email: socialId, nickname } = useAuth(); // Assuming the email is used as socialId
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const [trackInfos, setTrackInfos] = useState<TrackInfo[]>([]);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchLikes = async (pageToFetch: number) => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/music/likes", {
          params: { page: pageToFetch, size: 5 },
        });

        console.log("response.data:", response.data);

        const trackIdArray = response.data.data || [];
        setTrackIds((prevTrackIds) => [...prevTrackIds, ...trackIdArray]);
        setLast(response.data.last);
      } catch (error: any) {
        console.error("Error fetching liked songs:", error);
        setError("좋아요를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchLikes(page);
  }, [page]);

  useEffect(() => {
    const fetchTrackInfo = async (trackId: string) => {
      try {
        const response = await axios.get(`http://localhost:8000/spotify/track/${trackId}`);
        console.log("fetchTrackInfo response:", response.data);
        return response.data.response; // TrackInfo 타입 객체를 반환합니다.
      } catch (error) {
        console.error("Error fetching track info:", error);
        return null;
      }
    };

    const fetchAllTrackInfos = async () => {
      const newTrackInfos = await Promise.all(trackIds.map(fetchTrackInfo));
      setTrackInfos((prevTrackInfos) => [
        ...prevTrackInfos,
        ...newTrackInfos.filter((info) => info !== null) as TrackInfo[],
      ]);
    };

    if (trackIds.length > 0) {
      fetchAllTrackInfos();
    }
  }, [trackIds]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !last && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [last, loading]);

  console.log("trackInfos:", trackInfos);

  return (
    <S.Container>
      <S.HeaderText>{nickname}님의 playlist</S.HeaderText>
      {error && <p>{error}</p>}
      {trackInfos.length === 0 ? (
        <S.NoSongsMessage>
          <strong>Loading...</strong>
        </S.NoSongsMessage>
      ) : (
        <S.SliderContainer>
          {trackInfos.map((song, index) => (
            <S.SliderItem key={`${song.id}-${index}`}>
              {song.album && song.album.images ? (
                <>
                  <S.AlbumCover
                    src={song.album.images[0]?.url || 'default_image_url_here'}
                    alt="song album"
                    draggable="false"
                  />
                  <S.SongDetails>
                    <S.SongTitle>{song.name}</S.SongTitle>
                    <S.ArtistName>
                      {song.artists.map((artist: Artist) => artist.name).join(", ")}
                    </S.ArtistName>
                  </S.SongDetails>
                </>
              ) : (
                <span>불러오지 못했습니다.</span>
              )}
            </S.SliderItem>
          ))}
          <div ref={loader} style={{ height: '1px' }} />
        </S.SliderContainer>
      )}
    </S.Container>
  );
};

export default LikeSongPage;