import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "../Styles/LikedSongs.style";
import api from "../../../axiosInterceptor.js";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimation,
} from "framer-motion";

export interface Artist {
  name: string;
}

export interface Album {
  name: string;
  images: { url: string }[];
  release_date: string;
}

export interface TrackInfo {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  preview_url: string;
  duration_ms: number;
}

function LikedSongs() {
  //받아온 노래 리스트
  const [songs, setSongs] = useState<TrackInfo[]>([]);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const controls = useAnimation();

  //  좋아요를 누른 노래들의 ID
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<TrackInfo | null>(null);
  // // 좋아요 상태
  const [like, setLike] = useState<{ [key: string]: boolean }>({});
  // const [like, setLike] = useState(true);

  const fetchLikes = useCallback(async (pageToFetch: number) => {
    try {
      const response = await api.get("/music/likes", {
        params: { page: pageToFetch, size: 15 },
      });
      const { data, last } = response.data;

      setSongs((prevSongs) =>
        pageToFetch === 1 ? data : [...prevSongs, ...data]
      );
      setLast(last);
      console.log(`Fetched ${data.length} songs, last: ${last}`);
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
  }, []);

  useEffect(() => {
    fetchLikes(page);
  }, [fetchLikes, page]);

  const toggleLike = async (songId: string) => {
    const isLiked = likedSongs.includes(songId);
    const updatedLikeStatus = !isLiked;

    try {
      await api.post("/music/likes", {
        spotify: songId,
        like: updatedLikeStatus,
      });

      setLike((prevLike) => ({
        ...prevLike,
        [songId]: updatedLikeStatus,
      }));

      setLikedSongs((prevLikedSongs) => {
        if (updatedLikeStatus) {
          return [...prevLikedSongs, songId];
        } else {
          return prevLikedSongs.filter((id) => id !== songId);
        }
      });

      setSongs((prevSongs) => {
        if (!updatedLikeStatus) {
          return prevSongs.filter((song) => song.id !== songId);
        }
        return prevSongs;
      });

      // setLike((prevLike) => ({
      //   ...prevLike,
      //   [songId]: updatedLikeStatus,
      // }));
    } catch (error) {
      console.error("Error updating like status:", error);
    }
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

  const handleSongClick = (song: TrackInfo) => {
    setSelectedSong(song);
  };

  const handleClosePopup = () => {
    setSelectedSong(null);
  };

  return (
    <S.Container>
      <h2>마음에 든 노래</h2>
      {songs.length === 0 ? (
        <S.NoSongsMessage>좋아요를 누른 노래가 없습니다</S.NoSongsMessage>
      ) : (
        <S.SliderContainer
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {songs.map((song) => (
            <S.SliderItem key={song.id}>
              <S.AlbumCover
                src={song.album.images[0].url}
                alt="song album"
                onClick={() => handleSongClick(song)}
              />
              <S.SongDetails>
                <S.SongTitle>{song.album.name}</S.SongTitle>
                <S.ArtistName>
                  {song.artists.map((artist) => artist.name).join(" ")}
                </S.ArtistName>
              </S.SongDetails>
              <S.HeartButton onClick={() => toggleLike(song.id)}>
                {like[song.id] ? "❤️" : "🤍"}
              </S.HeartButton>
            </S.SliderItem>
          ))}
          <div ref={loader} style={{ width: "100%", height: "1px" }} />
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
