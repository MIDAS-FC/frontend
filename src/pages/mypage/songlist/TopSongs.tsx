import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "../Styles/TopSongs.style";
import api from "../../../axiosInterceptor.js";
import { useAnimation } from "framer-motion";

// 임시 인터페이스
interface SongInfo {
  id: string;
  title: string;
  artist: string;
  albumCoverUrl: string;
  durationMs: number;
  popularity: number;
  releaseDate: string;
}

function TopSongs() {
  const [songs, setSongs] = useState<SongInfo[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  //임시 상태관리
  const [likedSongs, setLikedSongs] = useState<number[]>([]);

  //   useEffect(() => {
  //     const token = localStorage.getItem("accessToken");
  //     if (token) {
  //       api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
  //       //   console.log("Access token retrieved:", token);
  //     } else {
  //       console.log("token error");
  //     }
  //   }, []);

  useEffect(() => {
    const fetchTopLikedSongs = async () => {
      try {
        const response = await api.get("/music/top10");
        console.log("top 10", response.data);
        setSongs((prevSongs) => {
          return response.data.length
            ? [...prevSongs, ...response.data]
            : prevSongs;
        });
      } catch (error: any) {
        if (error.response.data.code === "SAG1") {
          alert("외부 API와 통신이 불가능합니다.");
        } else {
          alert("노래 리스트를 가져오는 데 실패했습니다.");
          console.error("Error fetching top liked songs: ", error);
        }
      }
    };

    fetchTopLikedSongs();
  }, []);

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
  };

  // 임시 toggle
  const toggleLike = (index: number) => {
    setLikedSongs((prevLikedSongs) =>
      prevLikedSongs.includes(index)
        ? prevLikedSongs.filter((i) => i !== index)
        : [...prevLikedSongs, index]
    );
  };

  return (
    <S.Container>
      <S.HeaderText>인기곡 Top 10</S.HeaderText>
      {songs.length === 0 ? (
        <S.NoSongsMessage>Loading...</S.NoSongsMessage>
      ) : (
        <S.SliderContainer
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {songs.map((song, index) => (
            <S.SliderItem key={index}>
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
        </S.SliderContainer>
      )}
    </S.Container>
  );
}

export default TopSongs;
