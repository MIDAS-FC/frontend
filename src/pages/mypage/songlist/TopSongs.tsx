import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "../Styles/TopSongs.style";
import api from "../../../axiosInterceptor.js";
import { useAnimation } from "framer-motion";

// 임시 인터페이스
interface Song {
  title: string;
  artist: string;
  albumCoverUrl: string;
}

// 더미 데이터
const dummySongs: Song[] = [
  { title: "Song 1", artist: "Artist 1", albumCoverUrl: "path/to/image1.jpg" },
  { title: "Song 2", artist: "Artist 2", albumCoverUrl: "path/to/image2.jpg" },
  { title: "Song 3", artist: "Artist 3", albumCoverUrl: "path/to/image3.jpg" },
  { title: "Song 4", artist: "Artist 4", albumCoverUrl: "path/to/image4.jpg" },
  { title: "Song 5", artist: "Artist 5", albumCoverUrl: "path/to/image5.jpg" },
  { title: "Song 6", artist: "Artist 6", albumCoverUrl: "path/to/image6.jpg" },
  { title: "Song 7", artist: "Artist 7", albumCoverUrl: "path/to/image7.jpg" },
  { title: "Song 8", artist: "Artist 8", albumCoverUrl: "path/to/image8.jpg" },
  { title: "Song 9", artist: "Artist 9", albumCoverUrl: "path/to/image9.jpg" },
  {
    title: "Song 10",
    artist: "Artist 10",
    albumCoverUrl: "path/to/image10.jpg",
  },
];

function TopSongs() {
  //   const [songs, setSongs] = useState<Song[]>([]);
  const [songs, setSongs] = useState<Song[]>(dummySongs);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const controls = useAnimation();

  //임시 상태관리
  const [likedSongs, setLikedSongs] = useState<number[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
      //   console.log("Access token retrieved:", token);
    } else {
      console.log("token error");
    }
  }, []);

  // api 연결하기
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
      } catch (error) {
        console.error("Error fetching top liked songs: ", error);
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
    controls.start({
      x: -walk,
      transition: { type: "spring", stiffness: 300 },
    });
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
