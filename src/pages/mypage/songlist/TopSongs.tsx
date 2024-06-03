import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import api from "../../../axiosInterceptor.js";
import * as S from "../Styles/TopSongs.style";
import { TrackInfo } from "./LikedSongs";

function TopSongs() {
  const [songs, setSongs] = useState<TrackInfo[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  //임시 상태관리
  const [likedSongs, setLikedSongs] = useState<number[]>([]);
  const [selectedSong, setSelectedSong] = useState<TrackInfo | null>(null);

  //   useEffect(() => {
  //     const token = localStorage.getItem("accessToken");
  //     if (token) {
  //       api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
  //       //   console.log("Access token retrieved:", token);
  //     } else {
  //       console.log("token error");
  //     }
  //   }, []);

  // api 연결
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
        if (error.response && error.response.data) {
          if (error.response.data.code === "SAG1") {
            console.log("외부 API와 통신이 불가능합니다.");
          } else {
            console.log("노래 리스트를 가져오는 데 실패했습니다.");
          }
        } else {
          console.log("알 수 없는 오류가 발생했습니다.");
        }
      }
    };

    fetchTopLikedSongs();
  }, []);

  // useEffect(() => {
  //   const fetchTopLikedSongs = async () => {
  //     try {
  //       // 더미 데이터 생성
  //       const dummyResponse = [
  //         {
  //           id: "1",
  //           title: "Song 1",
  //           artist: "Artist 1",
  //           albumCoverUrl: "path/to/image1",
  //           durationMs: 200000,
  //           popularity: 90,
  //           releaseDate: "2023-01-01",
  //         },
  //         {
  //           id: "2",
  //           title: "Song 2",
  //           artist: "Artist 2",
  //           albumCoverUrl: "path/to/image2",
  //           durationMs: 180000,
  //           popularity: 85,
  //           releaseDate: "2023-01-02",
  //         },
  //         {
  //           id: "3",
  //           title: "Song 3",
  //           artist: "Artist 3",
  //           albumCoverUrl: "path/to/image3",
  //           durationMs: 220000,
  //           popularity: 80,
  //           releaseDate: "2023-01-03",
  //         },
  //       ];

  //       setSongs(dummyResponse);
  //     } catch (error) {
  //       console.log("Error fetching top songs (dummy data): ", error);
  //     }
  //   };

  //   fetchTopLikedSongs();
  // }, []);

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

  const handleSongClick = (song: TrackInfo) => {
    setSelectedSong(song);
  };

  const handleClosePopup = () => {
    setSelectedSong(null);
  };

  return (
    <S.Container>
      <S.HeaderText>인기곡 Top 10</S.HeaderText>
      {songs.length === 0 ? (
        <S.NoSongsMessage>
          <strong>Loding...</strong>
        </S.NoSongsMessage>
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
              <S.HeartButton onClick={() => toggleLike(index)}>
                {likedSongs.includes(index) ? "❤️" : "🤍"}
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

export default TopSongs;
