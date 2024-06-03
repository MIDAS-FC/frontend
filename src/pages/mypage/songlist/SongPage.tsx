import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as S from "../Styles/TopSongs.style";

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

function SongsPage() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // const [likedSongs, setLikedSongs] = useState<string[]>(() => {
  //   const saved = localStorage.getItem("likedSongs");
  //   return saved ? JSON.parse(saved) : [];
  // });

  const [likedSongs, setLikedSongs] = useState<string[]>([]);

  const [selectedSong, setSelectedSong] = useState<TrackInfoWithLike | null>(
    null
  );
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const [trackInfos, setTrackInfos] = useState<TrackInfoWithLike[]>([]);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);

  const loader = useRef<HTMLDivElement | null>(null);

  // Fetch top liked songs
  useEffect(() => {
    const fetchTopLikedSongs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/music/top10");
        const trackIdArray = Array.isArray(response.data)
          ? response.data
          : Object.keys(response.data);
        setTrackIds(trackIdArray);
      } catch (error: any) {
        console.error("Error fetching top liked songs:", error);
      }
    };
    fetchTopLikedSongs();
  }, []);

  // Fetch track info
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
          trackInfoArray.push(trackData);
        } catch (error) {
          console.error("Error fetching track info:", error);
        }
      }
      setTrackInfos(trackInfoArray);
    };
    fetchTrackInfos();
  }, [trackIds, likedSongs]);

  // // Fetch liked songs
  // useEffect(() => {
  //   const fetchLikes = async (pageToFetch: number) => {
  //     try {
  //       const response = await axios.get("/music/likes", {
  //         params: { page: pageToFetch, size: 5 },
  //       });
  //       const trackIdArray = Array.isArray(response.data.data)
  //         ? response.data.data
  //         : Object.keys(response.data.data);
  //       setTrackIds((prevTrackIds) =>
  //         pageToFetch === 1 ? trackIdArray : [...prevTrackIds, ...trackIdArray]
  //       );
  //       setLikedSongs((prevLikedSongs) =>
  //         pageToFetch === 1
  //           ? trackIdArray
  //           : [...prevLikedSongs, ...trackIdArray]
  //       );
  //       setLast(response.data.last);
  //     } catch (error: any) {
  //       console.error("Error fetching liked songs:", error);
  //     }
  //   };
  //   fetchLikes(page);
  // }, [page]);

  // Fetch liked songs
  useEffect(() => {
    const fetchLikes = async (pageToFetch: number) => {
      try {
        const response = await axios.get("http://localhost:8080/music/likes", {
          params: { page: pageToFetch, size: 5 },
        });
        const trackIdArray = Array.isArray(response.data.data)
          ? response.data.data
          : Object.keys(response.data.data);
        setTrackIds((prevTrackIds) =>
          pageToFetch === 1 ? trackIdArray : [...prevTrackIds, ...trackIdArray]
        );
        setLikedSongs((prevLikedSongs) =>
          pageToFetch === 1
            ? trackIdArray
            : [...prevLikedSongs, ...trackIdArray]
        );
        setLast(response.data.last);
      } catch (error: any) {
        console.error("Error fetching liked songs:", error);
      }
    };
    fetchLikes(page);
  }, [page]);

  // Handle like toggle
  const handleLikeToggle = async (trackId: string, isLiked: boolean) => {
    try {
      await axios.post("http://localhost:8080/music/likes", {
        spotify: trackId,
        like: !isLiked,
      });
      toggleLike(trackId, !isLiked);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  // // Toggle like state
  // const toggleLike = (trackId: string, newLikeStatus: boolean) => {
  //   setLikedSongs((prevLikedSongs) => {
  //     const updatedLikedSongs = newLikeStatus
  //       ? [...prevLikedSongs, trackId]
  //       : prevLikedSongs.filter((id) => id !== trackId);
  //     localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));
  //     return updatedLikedSongs;
  //   });

  //   setTrackInfos((prevTrackInfos) =>
  //     prevTrackInfos.map((track) =>
  //       track.id === trackId ? { ...track, liked: newLikeStatus } : track
  //     )
  //   );
  // };

  // Toggle like state
  const toggleLike = (trackId: string, newLikeStatus: boolean) => {
    setLikedSongs((prevLikedSongs) => {
      const updatedLikedSongs = newLikeStatus
        ? [...prevLikedSongs, trackId]
        : prevLikedSongs.filter((id) => id !== trackId);
      return updatedLikedSongs;
    });

    setTrackInfos((prevTrackInfos) =>
      prevTrackInfos.map((track) =>
        track.id === trackId ? { ...track, liked: newLikeStatus } : track
      )
    );
  };

  // Infinite scroll setup
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
              <S.HeartButton
                onClick={() => handleLikeToggle(song.id, song.liked)}
              >
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
      <div ref={loader} />
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
          {trackInfos
            .filter((song) => likedSongs.includes(song.id))
            .map((song, index) => (
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
                <S.HeartButton
                  onClick={() => handleLikeToggle(song.id, song.liked)}
                >
                  {song.liked ? "❤️" : "🤍"}
                </S.HeartButton>
              </S.SliderItem>
            ))}
        </S.SliderContainer>
      )}
    </S.Container>
  );
}

export default SongsPage;
