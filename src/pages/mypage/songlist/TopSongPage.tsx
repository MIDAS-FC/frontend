import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import * as S from "../Styles/SongPage.style";

export interface Artist {
  name: string;
}

interface Album {
  name: string;
  images: { url: string }[];
  release_date: string;
}
export interface TrackInfo {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  popularity: number;
  preview_url: string;
  duration_ms: number;
}

const TopSongPage: React.FC = () => {
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const [trackInfos, setTrackInfos] = useState<TrackInfo[]>([]);
  const [selectedSong, setSelectedSong] = useState<TrackInfo | null>(null);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/music/top10");
        const trackIdArray = Array.isArray(response.data)
          ? response.data
          : Object.keys(response.data);
        setTrackIds(trackIdArray);
      } catch (error) {
        console.error("Error fetching top liked songs:", error);
      }
    };

    fetchTopSongs();
  }, []);

  useEffect(() => {
    const fetchTrackInfos = async () => {
      const trackInfoArray: TrackInfo[] = [];

      for (const id of trackIds) {
        try {
          const response = await axios.get(
            `http://localhost:8000/spotify/track/${id}`
          );
          const trackData: TrackInfo = {
            ...response.data,
          };
          console.log(`Fetched track info for id ${id}:`, trackData); // 콘솔 로그 추가
          trackInfoArray.push(trackData);
        } catch (error) {
          console.error("Error fetching track info:", error);
        }
      }
      setTrackInfos(trackInfoArray);
    };

    if (trackIds.length > 0) {
      fetchTrackInfos();
    }
  }, [trackIds]);

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

  const handleSongClick = (song: TrackInfo) => {
    setSelectedSong(song);
  };

  const handleClosePopup = () => {
    setSelectedSong(null);
  };

  const formatDuration = (duration_ms: number) => {
    const seconds = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}초`;
  };

  return (
    <S.Container>
      <S.HeaderText>좋아요 많은 곡 Top 10</S.HeaderText>
      {trackInfos.length === 0 ? (
        <S.NoSongsMessage>
          <strong>Loading...</strong>
        </S.NoSongsMessage>
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
              {song.album && song.album.images ? (
                <>
                  <S.AlbumCover
                    src={song.album.images[0].url}
                    alt="song album"
                    draggable="false"
                    onClick={() => handleSongClick(song)}
                  />
                  <S.SongDetails>
                    <S.SongTitle>{song.name}</S.SongTitle>
                    <S.ArtistName>
                      {song.artists.map((artist) => artist.name).join(" ")}
                    </S.ArtistName>
                  </S.SongDetails>
                </>
              ) : (
                <span>불러오지 못했습니다.</span>
              )}
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
              <S.PopupSongTitle>{selectedSong.name}</S.PopupSongTitle>
              <S.PopupArtistName>
                {selectedSong.artists.map((artist) => artist.name).join(" ")}
              </S.PopupArtistName>
              <S.PopupSongInfo>
                <S.PopupSongDetail>
                  <strong>Duration:</strong>
                  {formatDuration(selectedSong.duration_ms)}
                </S.PopupSongDetail>
                <S.PopupSongDetail>
                  <strong>Popularity: </strong>
                  {selectedSong.popularity}
                </S.PopupSongDetail>
                <S.PopupSongDetail>
                  <strong>Release Date: </strong>
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
};

export default TopSongPage;