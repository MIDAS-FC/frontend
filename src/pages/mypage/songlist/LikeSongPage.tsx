import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../AuthProvider";
import { Artist, TrackInfo } from "../../diary/musicModal";
import * as S from "../Styles/SongPage.style";

const LikeSongPage: React.FC = () => {
  const { email: socialId, nickname } = useAuth(); // Assuming the email is used as socialId
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const [trackInfos, setTrackInfos] = useState<TrackInfo[]>([]);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackInfo | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loader = useRef<HTMLDivElement | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

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
        const response = await axios.get(
          `http://localhost:8000/spotify/track/${trackId}`
        );
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
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [last, loading]);

  const handleLikeButtonClick = (track: TrackInfo) => {
    setSelectedTrack(track);
    setShowModal(true);
  };

  // Implement mouse drag for horizontal scroll
  useEffect(() => {
    const slider = sliderContainerRef.current;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider?.classList.add("active");
      startX = e.pageX - slider!.offsetLeft;
      scrollLeft = slider!.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider?.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider?.classList.remove("active");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider!.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      slider!.scrollLeft = scrollLeft - walk;
    };

    if (slider) {
      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseleave", handleMouseLeave);
      slider.addEventListener("mouseup", handleMouseUp);
      slider.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseleave", handleMouseLeave);
        slider.removeEventListener("mouseup", handleMouseUp);
        slider.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  console.log("trackInfos:", trackInfos);

  return (
    <S.Container>
      <S.HeaderText>{nickname}님의 playlist</S.HeaderText>
      {error && <p>{error}</p>}
      <S.ScrollableContainer>
        {trackInfos.length === 0 ? (
          <S.NoSongsMessage>
            <strong>Loading...</strong>
          </S.NoSongsMessage>
        ) : (
          <S.SliderContainer ref={sliderContainerRef}>
            {trackInfos.map((song, index) => (
              <motion.div
                key={`${song.id}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <S.SliderItem>
                  {song.album && song.album.images ? (
                    <>
                      <S.AlbumCover
                        src={
                          song.album.images[0]?.url || "default_image_url_here"
                        }
                        alt="song album"
                        draggable="false"
                      />
                      <S.SongDetails>
                        <S.LikeButton
                          onClick={() => handleLikeButtonClick(song)}
                        >
                          {song.isLiked ? "🤍" : "❤️"}
                        </S.LikeButton>
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
              </motion.div>
            ))}
            <div ref={loader} style={{ height: "1px" }} />
          </S.SliderContainer>
        )}
      </S.ScrollableContainer>
    </S.Container>
  );
};

export default LikeSongPage;
