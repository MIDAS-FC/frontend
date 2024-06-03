import { AnimatePresence, useAnimation } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import api from "../../../axiosInterceptor.js";
import * as S from "../Styles/LikedSongs.style";
import axios from "axios";
import { TrackInfo, TrackInfoWithLike } from "./TopSongs.js";

export interface LikedSongInfo {
  data: string[];
  last: boolean;
}

function LikedSongs() {
  // 선택한 노래
  const [selectedSong, setSelectedSong] = useState<TrackInfoWithLike | null>(
    null
  );
  // api로 받아온 트랙 id
  const [trackIds, setTrackIds] = useState<string[]>([]);
  // 스포티파이 통해 가져온 트랙 정보
  const [trackInfos, setTrackInfos] = useState<TrackInfoWithLike[]>([]);
  // 좋아요 상태
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  //페이지
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const controls = useAnimation();

  useEffect(() => {
    const fetchLikes = async (pageToFetch: number) => {
      try {
        const response = await api.get("/music/likes", {
          params: { page: pageToFetch, size: 5 },
        });
        // const { data } = response;
        // setTrackIds((prevSongInfo) =>
        //   pageToFetch === 1 ? data : [...prevSongInfo, ...data]
        // );
        // setLast(data.last);
        const trackIdArray = Array.isArray(response.data.data)
          ? response.data.data
          : Object.keys(response.data.data);

        setTrackIds((prevTrackIds) =>
          pageToFetch === 1 ? trackIdArray : [...prevTrackIds, ...trackIdArray]
        );
        console.log("트랙 아이디 출력: ", trackIds);
        setLast(response.data.last);
      } catch (error: any) {
        if (error.response && error.response.data) {
          if (error.response.data.code === "SAG1") {
            console.log("외부 API와 통신이 불가능합니다.");
          } else {
            console.error("Error fetching liked songs: ", error);
          }
        } else {
          console.log("알 수 없는 오류가 발생했습니다.");
        }
      }
    };

    fetchLikes(page);
  }, [page]);

  useEffect(() => {
    const fetchTrackInfos = async () => {
      const trackInfoArray: TrackInfoWithLike[] = [];

      for (const id of trackIds) {
        try {
          const response = await axios.get(
            `http://localhost:8000/spotify/track/${id}`
          );
          const trackData: TrackInfoWithLike = {
            ...response.data,
            liked: true,
          };
          trackInfoArray.push(trackData);
        } catch (error) {
          console.error("Error fetching track info:", error);
        }
      }

      setTrackInfos(trackInfoArray);
      console.log("trackInfoss", trackInfos);
    };

    fetchTrackInfos();
  }, [trackIds]);

  const handleLikeToggle = async (trackId: string) => {
    try {
      const isLiked = likedSongs.includes(trackId);
      const response = await axios.post("http://localhost:8080/music/likes", {
        spotify: trackId,
        like: !isLiked,
      });

      toggleLike(trackId);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const toggleLike = (trackId: string) => {
    setLikedSongs((prevLikedSongs) =>
      prevLikedSongs.includes(trackId)
        ? prevLikedSongs.filter((id) => id !== trackId)
        : [...prevLikedSongs, trackId]
    );
    setTrackInfos((prevTrackInfos) =>
      prevTrackInfos.map((track) =>
        track.id === trackId ? { ...track, liked: !track.liked } : track
      )
    );
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !last) {
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
  }, [last]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current!.offsetLeft;
    scrollLeft.current = sliderRef.current!.scrollLeft;
    sliderRef.current!.style.cursor = "grabbing";
    sliderRef.current!.style.scrollBehavior = "auto";
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    sliderRef.current!.style.cursor = "grab";
    sliderRef.current!.style.scrollBehavior = "smooth";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    sliderRef.current!.style.cursor = "grab";
    sliderRef.current!.style.scrollBehavior = "smooth";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current!.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current!.scrollLeft = scrollLeft.current - walk;
    // controls.start({
    //   x: walk,
    //   transition: { type: "spring", stiffness: 200 },
    // });
  };

  const handleSongClick = (song: TrackInfoWithLike) => {
    setSelectedSong(song);
  };

  const handleClosePopup = () => {
    setSelectedSong(null);
  };

  return (
    <S.Container>
      <h2>마음에 든 노래</h2>
      {trackInfos.length === 0 ? (
        <S.NoSongsMessage>좋아요를 누른 노래가 없습니다</S.NoSongsMessage>
      ) : (
        <S.SliderContainer
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {trackInfos.map((song, index) => (
            <S.SliderItem key={`${song.id}-${index}`}>
              <S.AlbumCover
                src={song.album.images[0].url}
                alt="song album"
                draggable="false"
                onClick={() => handleSongClick(song)}
              />
              <S.SongDetails>
                <S.SongTitle>{song.album.name}</S.SongTitle>
                <S.ArtistName>
                  {song.artists.map((artist) => artist.name).join(" ")}
                </S.ArtistName>
              </S.SongDetails>
              <S.HeartButton onClick={() => handleLikeToggle(song.id)}>
                {likedSongs.includes(song.id) ? "❤️" : "🤍"}
              </S.HeartButton>
            </S.SliderItem>
          ))}
        </S.SliderContainer>
      )}
      <AnimatePresence>
        {selectedSong && (
          <S.Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <S.Popup
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <S.PopupAlbumCover
                src={selectedSong.album.images[0].url}
                alt="album cover"
                draggable="false"
              />
              <S.PopupSongTitle>{selectedSong.album.name}</S.PopupSongTitle>
              <S.PopupArtistName>
                {selectedSong.artists.map((artist) => artist.name).join(" ")}
              </S.PopupArtistName>
              <S.PopupSongInfo>
                <S.PopupSongDetail>
                  <strong>Duration:</strong>
                  {selectedSong.duration_ms}
                </S.PopupSongDetail>
                <S.PopupSongDetail>
                  <strong>Release Date:</strong>
                  {selectedSong.album.release_date}
                </S.PopupSongDetail>
              </S.PopupSongInfo>
              <S.CloseButton onClick={handleClosePopup}>닫기</S.CloseButton>
            </S.Popup>
          </S.Overlay>
        )}
      </AnimatePresence>
    </S.Container>
  );
}

export default LikedSongs;
