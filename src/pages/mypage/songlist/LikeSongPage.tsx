import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import api from "../../../axiosInterceptor";
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

// 좋아요 누른 리스트
function LikeSongPage() {
  // track Id
  const [trackIds, setTrackIds] = useState<string[]>([]);
  // track Id 노래에 대한 정보
  const [trackInfos, setTrackInfos] = useState<TrackInfo[]>([]);
  // 현재 페이지
  const [page, setPage] = useState(1);
  // 리스트가 끝이면 true 아니면 false
  const [last, setLast] = useState(false);
  // 선택한 노래
  const [selectedSong, setSelectedSong] = useState<TrackInfo | null>(null);

  // 슬라이더 관련
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const loader = useRef<HTMLDivElement | null>(null);

  // /music/likes => 좋아요 누른 노래 Id 불러오기
  useEffect(() => {
    const fetchLikes = async (pageToFetch: number) => {
      try {
        const response = await api.get("http://localhost:8080/music/likes", {
          params: { page: pageToFetch, size: 5 }, // 한번에 5개씩 보여주기
        });

        const trackIdArray = Array.isArray(response.data.data)
          ? response.data.data
          : Object.keys(response.data.data);

        // 중복 방지
        const newTrackIds = trackIdArray.filter(
          (id: string) => !trackIds.includes(id)
        );

        setTrackIds((prevTrackIds) => {
          const uniqueTrackIds = new Set([...prevTrackIds, ...newTrackIds]);
          return Array.from(uniqueTrackIds);
        });
        setLast(response.data.last);
      } catch (error: any) {
        console.error("Error fetching liked songs:", error);
      }
    };
    fetchLikes(page);
  }, [page]);

  // spotify와 연결
  useEffect(() => {
    const fetchTrackInfos = async () => {
      const trackInfoArray: TrackInfo[] = [];
      for (const id of trackIds) {
        try {
          const response = await api.get(
            `http://localhost:8000/spotify/track/${id}`
          );
          const trackData: TrackInfo = {
            ...response.data,
          };
          trackInfoArray.push(trackData);
        } catch (error) {
          console.error("Error fetching track info:", error);
        }
      }
      setTrackInfos(trackInfoArray);
    };
    fetchTrackInfos();
  }, []);

  // 무한스크롤 관련
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
  };

  // 슬라이더 요소 클릭
  const handleSongClick = (song: TrackInfo) => {
    setSelectedSong(song);
  };

  const handleClosePopup = () => {
    setSelectedSong(null);
  };

  // ms  -> 분 초
  const formatDuration = (duration_ms: number) => {
    const seconds = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `  ${minutes}분 ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}초`;
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
                    <S.SongTitle>{song.album.name}</S.SongTitle>
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
      {/* 
      팝업 페이지 */}
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
                {selectedSong.artists?.map((artist) => artist.name).join(" ")}
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
}

export default LikeSongPage;
