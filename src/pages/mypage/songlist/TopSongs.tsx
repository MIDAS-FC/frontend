import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import api from "../../../axiosInterceptor.js";
import * as S from "../Styles/TopSongs.style";
import axios from "axios";

export interface TrackInfoWithLike extends TrackInfo {
  liked: boolean;
}

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
  popularity: number;
}

function TopSongs() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 선택한 노래
  const [selectedSong, setSelectedSong] = useState<TrackInfoWithLike | null>(
    null
  );
  // api로 받아온 트랙 id
  const [trackIds, setTrackIds] = useState<string[]>([]);
  // 스포티파이 통해 가져온 트랙 정보
  const [trackInfos, setTrackInfos] = useState<TrackInfoWithLike[]>([]);
  // 좋아요 눌렀던 노래
  const [likedSongs, setLikedSongs] = useState<string[]>([]);

  // api 연결
  useEffect(() => {
    const fetchTopLikedSongs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/music/top10");

        const trackIdArray = Array.isArray(response.data)
          ? response.data
          : Object.keys(response.data);

        setTrackIds(trackIdArray);
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
            liked: likedSongs.includes(response.data.id),
          };
          trackInfoArray.push(response.data);
          // console.log("스포티파이 전체 출력", trackInfoArray);
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

  const handleSongClick = (song: TrackInfoWithLike) => {
    setSelectedSong(song);
  };

  const handleClosePopup = () => {
    setSelectedSong(null);
  };

  return (
    <S.Container>
      <S.HeaderText>좋아요 많은 곡 Top 10</S.HeaderText>
      {trackInfos.length === 0 ? (
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
          {trackInfos.map((song) => (
            <S.SliderItem key={song.id}>
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
                {song.liked ? "❤️" : "🤍"}
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
                  <strong>Popularity:</strong>
                  {selectedSong.popularity}
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
