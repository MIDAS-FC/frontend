import axios from "axios";
import { AnimatePresence } from "framer-motion";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useAuth } from "../../../AuthProvider";
import { Artist, TrackInfo } from "../../diary/MusicModal";
import * as S from "../Styles/SongPage.style";

interface TopIdInfo {
  trackId: string;
  likes: number;
}

interface TopSongPageProps {
  likeStatusChanged: boolean;
}

const TopSongPage = forwardRef<{ fetchTopSongs: () => void }, TopSongPageProps>(
  (props, ref) => {
    const { email: socialId, nickname } = useAuth(); // Assuming the email is used as socialId
    const [trackIdLike, setTrackIdLike] = useState<TopIdInfo[]>([]);
    const [trackInfos, setTrackInfos] = useState<TrackInfo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const sliderContainerRef = useRef<HTMLDivElement | null>(null);

    const fetchTopSongs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/music/top10", {
          params: { limit: 10 },
        });
        const trackIdArray = Object.keys(response.data).map((key) => ({
          trackId: key,
          likes: response.data[key],
        }));
        console.log("top10Id and likes", trackIdArray);
        setTrackIdLike(trackIdArray);
      } catch (error: any) {
        console.error("Error fetching top liked songs:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      fetchTopSongs,
    }));

    useEffect(() => {
      fetchTopSongs();
    }, [props.likeStatusChanged]);

    useEffect(() => {
      const fetchTrackInfo = async (trackId: string) => {
        try {
          const response = await axios.get(
            `http://localhost:8000/spotify/track/${trackId}`
          );
          const trackData = response.data.response;
          console.log("spotify info", trackData);
          return {
            ...trackData,
            // isLiked: true, // 서버에서 응답이 오는 데이터를 기반으로 설정
          };
        } catch (error) {
          console.error("Error fetching track info:", error);
          return null;
        }
      };

      const fetchAllTrackInfos = async () => {
        const newTrackInfos = await Promise.all(
          trackIdLike.map((track) => fetchTrackInfo(track.trackId))
        );
        setTrackInfos((prevTrackInfos) => [
          ...prevTrackInfos,
          ...(newTrackInfos.filter((info) => info !== null) as TrackInfo[]),
        ]);
      };

      if (trackIdLike.length > 0) {
        fetchAllTrackInfos();
      }
    }, [trackIdLike]);

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

    const sortedTrackInfos = trackIdLike
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .map((track) => trackInfos.find((info) => info.id === track.trackId))
      .filter((info) => info !== undefined) as TrackInfo[];

    return (
      <S.Container>
        <S.HeaderText>Top 10 playlist</S.HeaderText>
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
                {sortedTrackInfos.map((song, index) => {
                  const trackInfo = trackIdLike.find(
                    (track) => track.trackId === song.id
                  );
                  const likes = trackInfo ? trackInfo.likes : 0;
                  return (
                    <S.TopSliderItem
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
                            src={
                              song.album.images[0]?.url ||
                              "default_image_url_here"
                            }
                            alt="song album"
                            draggable="false"
                          />
                          <S.SongDetails>
                            <S.SongTitle>{song.name}</S.SongTitle>
                            <S.TopArtistName index={index}>
                              {song.artists
                                .map((artist: Artist) => artist.name)
                                .join(", ")}
                            </S.TopArtistName>
                          </S.SongDetails>
                        </>
                      ) : (
                        <span>불러오지 못했습니다.</span>
                      )}
                    </S.TopSliderItem>
                  );
                })}
              </AnimatePresence>
            </S.SliderContainer>
          )}
          <S.ScrollButton onClick={scrollRight}>{""}</S.ScrollButton>
        </S.ScrollableContainer>
      </S.Container>
    );
  }
);

export default TopSongPage;
