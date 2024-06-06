import axios from "axios";
import { AnimatePresence } from "framer-motion";
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

  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchLikes = async (pageToFetch: number) => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/music/likes", {
          params: { page: pageToFetch, size: 5 },
        });

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
        const trackData = response.data.response;
        return {
          ...trackData,
          isLiked: true // 서버에서 응답이 오는 데이터를 기반으로 설정
        };
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

  const handleLikeToggle = async (track: TrackInfo) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      console.error("Missing tokens, redirecting to login.");
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Authorization-Refresh': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json'
      }
    };

    const data = {
      socialId: socialId,
      spotify: track.id,
      like: !track.isLiked
    };

    try {
      const response = await axios.put("http://localhost:8080/music/likes", data, config);

      if (response.status === 204 || response.status === 200) {
        // 애니메이션을 위해 UI에서 항목을 제거
        setTrackInfos((prevTrackInfos) =>
          prevTrackInfos.map((t) =>
            t.id === track.id ? { ...t, isLiked: !t.isLiked, isRemoving: true } : t
          )
        );
        setTimeout(() => {
          setTrackInfos((prevTrackInfos) =>
            prevTrackInfos.filter((t) => t.id !== track.id)
          );
        }, 500);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, please login again.");
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const scrollLeft = () => {
    if (sliderContainerRef.current) {
      sliderContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderContainerRef.current) {
      sliderContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <S.Container>
      <S.HeaderText>{nickname}님의 playlist</S.HeaderText>
      {error && <p>{error}</p>}
      <S.ScrollableContainer>
        <S.ScrollButton onClick={scrollLeft}>{""}</S.ScrollButton>
        {trackInfos.length === 0 ? (
          <S.NoSongsMessage>
            <strong>Loading...</strong>
          </S.NoSongsMessage>
        ) : (
          <S.SliderContainer ref={sliderContainerRef}>
            <AnimatePresence>
              {trackInfos.map((song, index) => (
                <S.SliderItem
                  key={`${song.id}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                >
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
                        <S.LikeButton onClick={() => handleLikeToggle(song)}>
                          {song.isLiked ? "❤️" : "🤍"}
                        </S.LikeButton>
                      </S.SongDetails>
                    </>
                  ) : (
                    <span>불러오지 못했습니다.</span>
                  )}
                </S.SliderItem>
              ))}
            </AnimatePresence>
          </S.SliderContainer>
        )}
        <S.ScrollButton onClick={scrollRight}>{""}</S.ScrollButton>
      </S.ScrollableContainer>
    </S.Container>
  );
};

export default LikeSongPage;