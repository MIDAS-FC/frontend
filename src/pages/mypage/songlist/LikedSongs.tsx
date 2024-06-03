import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "../Styles/LikedSongs.style";
import api from "../../../axiosInterceptor.js";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimation,
} from "framer-motion";

// 임시 인터페이스
interface Song {
  title: string;
  artist: string;
  albumCoverUrl: string;
}

function LikedSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const controls = useAnimation();

  //임시 상태관리
  const [likedSongs, setLikedSongs] = useState<number[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
  //     // console.log("Access token retrieved:", token);
  //   } else {
  //     console.log("token error");
  //   }
  // }, []);

  /////////////////////////////////////////////////////

  // // api 연결하기
  // const fetchLikes = useCallback(async (pageToFetch: number) => {
  //   try {
  //     // api 연결하기
  //     const response = await api.get("/music/likes", {
  //       params: { page: pageToFetch, size: 15 },
  //     });
  //     const { data, last } = response.data;

  //     setSongs((prevSongs) =>
  //       pageToFetch === 1 ? data : [...prevSongs, ...data]
  //     );
  //     setLast(last);
  //     console.log(`Fetched ${data.length} songs, last: ${last}`);
  //   } catch (error: any) {
  //     if (error.response && error.response.data) {
  //       if (error.response.data.code === "SAG1") {
  //         console.log("외부 API와 통신이 불가능합니다.");
  //       } else {
  //         console.error("Error fetching liked songs: ", error);
  //       }
  //     } else {
  //       console.log("알 수 없는 오류가 발생했습니다.");
  //     }
  //   }
  // }, []);

  const fetchLikes = useCallback(async (pageToFetch: number) => {
    try {
      // 더미 데이터 생성
      const dummyResponse = {
        data: Array.from({ length: 15 }, (_, i) => ({
          title: `Song ${pageToFetch * 15 - 14 + i}`,
          artist: `Artist ${pageToFetch * 15 - 14 + i}`,
          albumCoverUrl: "path/to/image",
        })),
        last: pageToFetch >= 3, // 3페이지 이후는 없다고 가정
      };

      const { data, last } = dummyResponse;
      setSongs((prevSongs) =>
        pageToFetch === 1 ? data : [...prevSongs, ...data]
      );
      setLast(last);
      console.log(`Fetched ${data.length} songs, last: ${last}`);
    } catch (error) {
      console.error("Error fetching liked songs: ", error);
    }
  }, []);

  useEffect(() => {
    fetchLikes(page);
  }, [fetchLikes, page]);

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

  // 임시 toggle
  const toggleLike = (index: number) => {
    setLikedSongs((prevLikedSongs) =>
      prevLikedSongs.includes(index)
        ? prevLikedSongs.filter((i) => i !== index)
        : [...prevLikedSongs, index]
    );
  };

  const handleSongClick = (song: Song) => {
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
          {songs.map((song, index) => (
            <S.SliderItem key={index} onClick={() => handleSongClick(song)}>
              <S.AlbumCover src={song.albumCoverUrl} alt="song album" />
              <S.SongDetails>
                <S.SongTitle>{song.title}</S.SongTitle>
                <S.ArtistName>{song.artist}</S.ArtistName>
              </S.SongDetails>
              <S.HeartButton onClick={() => toggleLike(index)}>
                {likedSongs.includes(index) ? "❤️" : "🤍"}
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
                src={selectedSong.albumCoverUrl}
                alt="album cover"
              />
              <S.PopupSongTitle>{selectedSong.title}</S.PopupSongTitle>
              <S.PopupArtistName>{selectedSong.artist}</S.PopupArtistName>
              <S.PopupSongInfo>
                <S.PopupSongDetail>
                  <strong>Duration:</strong>{" "}
                </S.PopupSongDetail>
                <S.PopupSongDetail>
                  <strong>Popularity:</strong>
                </S.PopupSongDetail>
                <S.PopupSongDetail>
                  <strong>Release Date:</strong>
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
