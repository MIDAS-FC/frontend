import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../AuthProvider";
import { Artist, TrackInfo } from "../../diary/MusicModal";
import * as S from "../Styles/SongPage.style";

interface LikeSongPageProps {
  onLikeStatusChange: () => void;
}

const LikeSongPage: React.FC<LikeSongPageProps> = ({
  onLikeStatusChange,
}: LikeSongPageProps) => {
  const { email: socialId, nickname } = useAuth(); // Assuming the email is used as socialId
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const [trackInfos, setTrackInfos] = useState<TrackInfo[]>([]);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Function to fetch all track IDs page by page
  const fetchAllTrackIds = async () => {
    let currentPage = 1;
    let allTrackIds: string[] = [];
    let lastPage = false;

    while (!lastPage) {
      try {
        const response = await axios.get("http://localhost:8080/music/likes", {
          params: { page: currentPage, size: 5 },
        });

        const trackIdArray = response.data.data || [];
        allTrackIds = [...allTrackIds, ...trackIdArray];
        lastPage = response.data.last;
        currentPage += 1;
      } catch (error: any) {
        console.error("Error fetching liked songs:", error);
        setError("좋아요를 가져오는 중 오류가 발생했습니다.");
        break;
      }
    }

    setTrackIds(allTrackIds);
  };

  useEffect(() => {
    fetchAllTrackIds();
  }, []);

  useEffect(() => {
    const fetchTrackInfo = async (trackId: string) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/spotify/track/${trackId}`
        );
        const trackData = response.data.response;
        return {
          ...trackData,
          isLiked: true, // 서버에서 응답이 오는 데이터를 기반으로 설정
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
        ...(newTrackInfos.filter((info) => info !== null) as TrackInfo[]),
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

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [last, loading]);

  const handleLikeToggle = async (track: TrackInfo) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      console.error("Missing tokens, redirecting to login.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Authorization-Refresh": `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    };

    const data = {
      socialId: socialId,
      spotify: track.id,
      like: !track.isLiked,
    };

    try {
      const response = await axios.put(
        "http://localhost:8080/music/likes",
        data,
        config
      );

      if (response.status === 204 || response.status === 200) {
        setTrackInfos((prevTrackInfos) =>
          prevTrackInfos.map((t) =>
            t.id === track.id
              ? { ...t, isLiked: !t.isLiked, isRemoving: true }
              : t
          )
        );
        setTimeout(() => {
          setTrackInfos((prevTrackInfos) =>
            prevTrackInfos.filter((t) => t.id !== track.id)
          );
        }, 500);

        // 상태 변화를 상위 컴포넌트에 알려 TopSongPage 재호출
        onLikeStatusChange();
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
      const isAtStart = sliderContainerRef.current.scrollLeft === 0;
      if (isAtStart) {
        sliderContainerRef.current.scrollLeft =
          sliderContainerRef.current.scrollWidth;
      } else {
        sliderContainerRef.current.scrollBy({
          left: -300,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRight = () => {
    if (sliderContainerRef.current) {
      const isAtEnd =
        sliderContainerRef.current.scrollLeft +
          sliderContainerRef.current.clientWidth >=
        sliderContainerRef.current.scrollWidth;
      if (isAtEnd) {
        sliderContainerRef.current.scrollLeft = 0;
      } else {
        sliderContainerRef.current.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <S.Container>
      <S.HeaderText>{decodeURIComponent(nickname)}님의 playlist</S.HeaderText>
      {error && <p>{error}</p>}
      <S.ScrollableContainer>
        <S.ScrollButton onClick={scrollLeft}>{"<"}</S.ScrollButton>
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
                        src={
                          song.album.images[0]?.url || "default_image_url_here"
                        }
                        alt="song album"
                        draggable="false"
                      />
                      <S.LikeButton onClick={() => handleLikeToggle(song)}>
                        {song.isLiked ? "❤️" : "🤍"}
                      </S.LikeButton>
                      <S.SongDetails>
                        <S.SongTitle>{song.name}</S.SongTitle>
                        <S.ArtistName>
                          {song.artists
                            .map((artist: Artist) => artist.name)
                            .join(", ")}
                        </S.ArtistName>
                      </S.SongDetails>
                    </>
                  ) : (
                    <span>불러오지 못했습니다.</span>
                  )}
                </S.SliderItem>
              ))}
            </AnimatePresence>
            <div ref={loaderRef} style={{ width: "100%", height: "1px" }} />
          </S.SliderContainer>
        )}
        <S.ScrollButton onClick={scrollRight}>{">"}</S.ScrollButton>
      </S.ScrollableContainer>
    </S.Container>
  );
};

export default LikeSongPage;
