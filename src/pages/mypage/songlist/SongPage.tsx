import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as S from "../Styles/SongPage.style";

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
  const sliderRef_like = useRef<HTMLDivElement | null>(null);
  const isDragging_like = useRef(false);
  const startX_like = useRef(0);
  const scrollLeft_like = useRef(0);
  const sliderRef_top = useRef<HTMLDivElement | null>(null);
  const isDragging_top = useRef(false);
  const startX_top = useRef(0);
  const scrollLeft_top = useRef(0);

  const [selectedSong, setSelectedSong] = useState<TrackInfo | null>(null);
  const [trackIds_like, setTrackIds_like] = useState<string[]>([]);
  const [trackInfos_like, setTrackInfos_like] = useState<TrackInfo[]>([]);
  const [trackIds_top, setTrackIds_top] = useState<string[]>([]);
  const [trackInfos_top, setTrackInfos_top] = useState<TrackInfo[]>([]);
  const [likedSongs, setLikedSongs] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);

  const loader = useRef<HTMLDivElement | null>(null);

  // 탑10 리스트
  useEffect(() => {
    const fetchTopLikedSongs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/music/top10");
        const trackIdArray = Array.isArray(response.data)
          ? response.data
          : Object.keys(response.data);
        setTrackIds_top(trackIdArray);
      } catch (error: any) {
        console.error("Error fetching top liked songs:", error);
      }
    };
    fetchTopLikedSongs();
  }, []);

  // 탑10-스포티파이
  useEffect(() => {
    const fetchTrackInfos_top = async () => {
      const trackInfoArray: TrackInfo[] = [];
      for (const id of trackIds_top) {
        try {
          const response = await axios.get(
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
      setTrackInfos_top(trackInfoArray);
    };
    fetchTrackInfos_top();
  }, []);

  // 좋아요 리스트
  useEffect(() => {
    const fetchLikes = async (pageToFetch: number) => {
      try {
        const response = await axios.get("http://localhost:8080/music/likes", {
          params: { page: pageToFetch, size: 5 },
        });

        const trackIdArray = Array.isArray(response.data.data)
          ? response.data.data
          : Object.keys(response.data.data);

        const newTrackIds = trackIdArray.filter(
          (id: string) => !trackIds_like.includes(id)
        );

        // setTrackIds_like((prevTrackIds) =>
        //   pageToFetch === 1 ? trackIdArray : [...prevTrackIds, ...trackIdArray]
        // );

        // 중복 방지
        setTrackIds_like((prevTrackIds) => {
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

  // 좋아요 리스트-스포티파이
  useEffect(() => {
    const fetchTrackInfos_like = async () => {
      const trackInfoArray: TrackInfo[] = [];
      for (const id of trackIds_like) {
        try {
          const response = await axios.get(
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
      setTrackInfos_like(trackInfoArray);
    };
    fetchTrackInfos_like();
  }, []);

  // const handleLikeToggle_like = async (
  //   trackId_like: string,
  //   isLiked: boolean
  // ) => {
  //   try {
  //     await axios.post("http://localhost:8080/music/likes", {
  //       spotify: trackId_like,
  //       like: !isLiked,
  //     });
  //     toggleLike_like(trackId_like);
  //   } catch (error) {
  //     console.error("Error updating like status:", error);
  //   }
  // };

  // const toggleLike_like = (trackId: string) => {
  //   setTrackInfos_like((prevTrackInfos) =>
  //     prevTrackInfos.filter((track) => track.id !== trackId)
  //   );
  //   setTrackIds_like((prevTrackIds) =>
  //     prevTrackIds.filter((id) => id !== trackId)
  //   );
  // };

  const handleLikeToggle_like = async (trackId: string) => {
    try {
      await axios.post("http://localhost:8080/music/likes", {
        spotify: trackId,
        like: false,
      });
      toggleLike(trackId);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const toggleLike = (trackId: string) => {
    setLikedSongs((prevLikedSongs) => {
      const updatedLikedSongs = prevLikedSongs.includes(trackId)
        ? prevLikedSongs.filter((id) => id !== trackId)
        : [...prevLikedSongs, trackId];
      return updatedLikedSongs;
    });

    setTrackInfos_like((prevTrackInfos) =>
      prevTrackInfos.filter((track) => track.id !== trackId)
    );
  };

  const handleLikeToggle_top = async (trackId: string) => {
    try {
      await axios.post("http://localhost:8080/music/likes", {
        spotify: trackId,
        like: !likedSongs.includes(trackId),
      });
      toggleLike(trackId);
      const likedTrack = trackInfos_top.find((track) => track.id === trackId);
      if (likedTrack) {
        setTrackInfos_like((prevTrackInfos) => [...prevTrackInfos, likedTrack]);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
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

  const handleMouseDown_like = (e: React.MouseEvent) => {
    isDragging_like.current = true;
    startX_like.current = e.pageX - sliderRef_like.current!.offsetLeft;
    scrollLeft_like.current = sliderRef_like.current!.scrollLeft;
    sliderRef_like.current!.style.cursor = "grabbing";
    sliderRef_like.current!.style.scrollBehavior = "auto";
  };

  const handleMouseLeave_like = () => {
    isDragging_like.current = false;
    sliderRef_like.current!.style.cursor = "grab";
    sliderRef_like.current!.style.scrollBehavior = "smooth";
  };

  const handleMouseUp_like = () => {
    isDragging_like.current = false;
    sliderRef_like.current!.style.cursor = "grab";
    sliderRef_like.current!.style.scrollBehavior = "smooth";
  };

  const handleMouseMove_like = (e: React.MouseEvent) => {
    if (!isDragging_like.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef_like.current!.offsetLeft;
    const walk = (x - startX_like.current) * 1.5;
    sliderRef_like.current!.scrollLeft = scrollLeft_like.current - walk;
  };

  const handleMouseDown_top = (e: React.MouseEvent) => {
    isDragging_top.current = true;
    startX_top.current = e.pageX - sliderRef_top.current!.offsetLeft;
    scrollLeft_top.current = sliderRef_top.current!.scrollLeft;
    sliderRef_top.current!.style.cursor = "grabbing";
    sliderRef_top.current!.style.scrollBehavior = "auto";
  };

  const handleMouseLeave_top = () => {
    isDragging_top.current = false;
    sliderRef_top.current!.style.cursor = "grab";
    sliderRef_top.current!.style.scrollBehavior = "smooth";
  };

  const handleMouseUp_top = () => {
    isDragging_top.current = false;
    sliderRef_top.current!.style.cursor = "grab";
    sliderRef_top.current!.style.scrollBehavior = "smooth";
  };

  const handleMouseMove_top = (e: React.MouseEvent) => {
    if (!isDragging_top.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef_top.current!.offsetLeft;
    const walk = (x - startX_top.current) * 1.5;
    sliderRef_top.current!.scrollLeft = scrollLeft_top.current - walk;
  };

  const handleSongClick = (song: TrackInfo) => {
    setSelectedSong(song);
  };

  const handleClosePopup = () => {
    setSelectedSong(null);
  };

  const formatDuration = (duration_ms: number) => {
    // 밀리초를 초로 변환
    const seconds = Math.floor(duration_ms / 1000);
    // 초를 분과 초로 분리
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // 분과 초를 문자열로 반환
    return `  ${minutes}분 ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}초`;
  };

  return (
    <S.Container>
      <S.HeaderText>좋아요 많은 곡 Top 10</S.HeaderText>
      {trackInfos_top.length === 0 ? (
        <S.NoSongsMessage>
          <strong>Loading...</strong>
        </S.NoSongsMessage>
      ) : (
        <S.SliderContainer
          ref={sliderRef_top}
          onMouseDown={handleMouseDown_top}
          onMouseLeave={handleMouseLeave_top}
          onMouseUp={handleMouseUp_top}
          onMouseMove={handleMouseMove_top}
        >
          {trackInfos_top.map((song, index) => (
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
              <S.HeartButton onClick={() => handleLikeToggle_top(song.id)}>
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
      <div ref={loader} />
      <S.HeaderText>마음에 든 노래 </S.HeaderText>
      {trackInfos_like.length === 0 ? (
        <S.NoSongsMessage>좋아요를 누른 노래가 없습니다</S.NoSongsMessage>
      ) : (
        <S.SliderContainer
          ref={sliderRef_like}
          onMouseDown={handleMouseDown_like}
          onMouseLeave={handleMouseLeave_like}
          onMouseUp={handleMouseUp_like}
          onMouseMove={handleMouseMove_like}
        >
          {trackInfos_like.map((song, index) => (
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
              <S.HeartButton onClick={() => handleLikeToggle_like(song.id)}>
                {"❤️"}
              </S.HeartButton>
            </S.SliderItem>
          ))}
        </S.SliderContainer>
      )}
    </S.Container>
  );
}

export default SongsPage;

// import { AnimatePresence } from "framer-motion";
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import * as S from "../Styles/SongPage.style";

// export interface TrackInfoWithLike extends TrackInfo {
//   liked: boolean;
// }

// export interface Artist {
//   name: string;
// }

// export interface Album {
//   name: string;
//   images: { url: string }[];
//   release_date: string;
// }

// export interface TrackInfo {
//   id: string;
//   name: string;
//   artists: Artist[];
//   album: Album;
//   preview_url: string;
//   duration_ms: number;
//   popularity: number;
// }

// function SongsPage() {
//   const sliderRef = useRef<HTMLDivElement | null>(null);
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   const [likedSongs, setLikedSongs] = useState<string[]>([]);

//   const [selectedSong, setSelectedSong] = useState<TrackInfoWithLike | null>(
//     null
//   );
//   const [trackIds_like, setTrackIds_like] = useState<string[]>([]);
//   const [trackInfos_like, setTrackInfos_like] = useState<TrackInfoWithLike[]>(
//     []
//   );
//   const [trackIds_top, setTrackIds_top] = useState<string[]>([]);
//   const [trackInfos_top, setTrackInfos_top] = useState<TrackInfoWithLike[]>([]);
//   const [page, setPage] = useState(1);
//   const [last, setLast] = useState(false);

//   const loader = useRef<HTMLDivElement | null>(null);

//   // Fetch top liked songs
//   useEffect(() => {
//     const fetchTopLikedSongs = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/music/top10");
//         const trackIdArray = Array.isArray(response.data)
//           ? response.data
//           : Object.keys(response.data);
//         setTrackIds_top(trackIdArray);
//       } catch (error: any) {
//         console.error("Error fetching top liked songs:", error);
//       }
//     };
//     fetchTopLikedSongs();
//   }, []);

//   // Fetch track info
//   useEffect(() => {
//     const fetchTrackInfos_top = async () => {
//       const trackInfoArray: TrackInfoWithLike[] = [];
//       for (const id of trackIds_top) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/spotify/track/${id}`
//           );
//           const trackData: TrackInfoWithLike = {
//             ...response.data,
//             liked: likedSongs.includes(response.data.id),
//           };
//           trackInfoArray.push(trackData);
//         } catch (error) {
//           console.error("Error fetching track info:", error);
//         }
//       }
//       setTrackInfos_top(trackInfoArray);
//     };
//     fetchTrackInfos_top();
//   }, [trackIds_top, likedSongs]);

//   useEffect(() => {
//     const fetchLikes = async (pageToFetch: number) => {
//       try {
//         const response = await axios.get("http://localhost:8080/music/likes", {
//           params: { page: pageToFetch, size: 5 },
//         });

//         const trackIdArray = Array.isArray(response.data.data)
//           ? response.data.data
//           : Object.keys(response.data.data);

//         const newTrackIds = trackIdArray.filter(
//           (id: string) => !likedSongs.includes(id)
//         );

//         // setTrackIds_like((prevTrackIds) =>
//         //   pageToFetch === 1 ? trackIdArray : [...prevTrackIds, ...trackIdArray]
//         // );
//         // setLikedSongs((prevLikedSongs) =>
//         //   pageToFetch === 1
//         //     ? trackIdArray
//         //     : [...prevLikedSongs, ...trackIdArray]
//         // );

//         setTrackIds_like((prevTrackIds) =>
//           pageToFetch === 1 ? trackIdArray : [...prevTrackIds, ...newTrackIds]
//         );
//         setLikedSongs((prevLikedSongs) => [...prevLikedSongs, ...newTrackIds]);

//         setLast(response.data.last);
//       } catch (error: any) {
//         console.error("Error fetching liked songs:", error);
//       }
//     };
//     fetchLikes(page);
//   }, [page]);

//   // Fetch track info
//   useEffect(() => {
//     const fetchTrackInfos_like = async () => {
//       const trackInfoArray: TrackInfoWithLike[] = [];
//       for (const id of trackIds_like) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/spotify/track/${id}`
//           );
//           const trackData: TrackInfoWithLike = {
//             ...response.data,
//             liked: likedSongs.includes(response.data.id),
//           };
//           trackInfoArray.push(trackData);
//         } catch (error) {
//           console.error("Error fetching track info:", error);
//         }
//       }
//       setTrackInfos_like(trackInfoArray);
//     };
//     fetchTrackInfos_like();
//   }, [trackIds_like, likedSongs]);

//   // Handle like toggle
//   const handleLikeToggle_top = async (
//     trackId_top: string,
//     isLiked: boolean
//   ) => {
//     try {
//       await axios.post("http://localhost:8080/music/likes", {
//         spotify: trackId_top,
//         like: !isLiked,
//       });
//       toggleLike_top(trackId_top, !isLiked);
//     } catch (error) {
//       console.error("Error updating like status:", error);
//     }
//   };

//   // Handle like toggle
//   const handleLikeToggle_like = async (
//     trackId_like: string,
//     isLiked: boolean
//   ) => {
//     try {
//       await axios.post("http://localhost:8080/music/likes", {
//         spotify: trackId_like,
//         like: !isLiked,
//       });
//       toggleLike_like(trackId_like, !isLiked);
//     } catch (error) {
//       console.error("Error updating like status:", error);
//     }
//   };

//   // Toggle like state
//   const toggleLike_like = (trackId: string, newLikeStatus: boolean) => {
//     setLikedSongs((prevLikedSongs) => {
//       const updatedLikedSongs = newLikeStatus
//         ? [...prevLikedSongs, trackId]
//         : prevLikedSongs.filter((id) => id !== trackId);
//       return updatedLikedSongs;
//     });

//     setTrackInfos_like((prevTrackInfos) =>
//       prevTrackInfos.map((track) =>
//         track.id === trackId ? { ...track, liked: newLikeStatus } : track
//       )
//     );
//   };

//   const toggleLike_top = (trackId: string, newLikeStatus: boolean) => {
//     setLikedSongs((prevLikedSongs) => {
//       const updatedLikedSongs = newLikeStatus
//         ? [...prevLikedSongs, trackId]
//         : prevLikedSongs.filter((id) => id !== trackId);
//       return updatedLikedSongs;
//     });

//     setTrackInfos_top((prevTrackInfos) =>
//       prevTrackInfos.map((track) =>
//         track.id === trackId ? { ...track, liked: newLikeStatus } : track
//       )
//     );
//   };

//   // Infinite scroll setup
//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: "20px",
//       threshold: 1.0,
//     };
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && !last) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     }, options);
//     if (loader.current) {
//       observer.observe(loader.current);
//     }
//     return () => {
//       if (loader.current) {
//         observer.unobserve(loader.current);
//       }
//     };
//   }, [last]);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     isDragging.current = true;
//     startX.current = e.pageX - sliderRef.current!.offsetLeft;
//     scrollLeft.current = sliderRef.current!.scrollLeft;
//     sliderRef.current!.style.cursor = "grabbing";
//     sliderRef.current!.style.scrollBehavior = "auto";
//   };

//   const handleMouseLeave = () => {
//     isDragging.current = false;
//     sliderRef.current!.style.cursor = "grab";
//     sliderRef.current!.style.scrollBehavior = "smooth";
//   };

//   const handleMouseUp = () => {
//     isDragging.current = false;
//     sliderRef.current!.style.cursor = "grab";
//     sliderRef.current!.style.scrollBehavior = "smooth";
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging.current) return;
//     e.preventDefault();
//     const x = e.pageX - sliderRef.current!.offsetLeft;
//     const walk = (x - startX.current) * 1.5;
//     sliderRef.current!.scrollLeft = scrollLeft.current - walk;
//   };

//   const handleSongClick = (song: TrackInfoWithLike) => {
//     setSelectedSong(song);
//   };

//   const handleClosePopup = () => {
//     setSelectedSong(null);
//   };

//   const formatDuration = (duration_ms: number) => {
//     // 밀리초를 초로 변환
//     const seconds = Math.floor(duration_ms / 1000);
//     // 초를 분과 초로 분리
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;

//     // 분과 초를 문자열로 반환
//     return `  ${minutes}분 ${
//       remainingSeconds < 10 ? "0" : ""
//     }${remainingSeconds}초`;
//   };

//   return (
//     <S.Container>
//       <S.HeaderText>좋아요 많은 곡 Top 10</S.HeaderText>
//       {trackInfos_top.length === 0 ? (
//         <S.NoSongsMessage>
//           <strong>Loading...</strong>
//         </S.NoSongsMessage>
//       ) : (
//         <S.SliderContainer
//           ref={sliderRef}
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//         >
//           {trackInfos_top.map((song, index) => (
//             <S.SliderItem key={`${song.id}-${index}`}>
//               <S.AlbumCover
//                 src={song.album.images[0].url}
//                 alt="song album"
//                 draggable="false"
//                 onClick={() => handleSongClick(song)}
//               />
//               <S.SongDetails>
//                 <S.SongTitle>{song.album.name}</S.SongTitle>
//                 <S.ArtistName>
//                   {song.artists.map((artist) => artist.name).join(" ")}
//                 </S.ArtistName>
//               </S.SongDetails>
//               <S.HeartButton
//                 onClick={() => handleLikeToggle_top(song.id, song.liked)}
//               >
//                 {song.liked ? "❤️" : "🤍"}
//               </S.HeartButton>
//             </S.SliderItem>
//           ))}
//         </S.SliderContainer>
//       )}
//       <AnimatePresence>
//         {selectedSong && (
//           <S.Overlay
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <S.Popup
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0 }}
//             >
//               <S.PopupAlbumCover
//                 src={selectedSong.album.images[0].url}
//                 alt="album cover"
//                 draggable="false"
//               />
//               <S.PopupSongTitle>{selectedSong.album.name}</S.PopupSongTitle>
//               <S.PopupArtistName>
//                 {selectedSong.artists.map((artist) => artist.name).join(" ")}
//               </S.PopupArtistName>
//               <S.PopupSongInfo>
//                 <S.PopupSongDetail>
//                   <strong>Duration:</strong>
//                   {formatDuration(selectedSong.duration_ms)}
//                 </S.PopupSongDetail>
//                 <S.PopupSongDetail>
//                   <strong>Popularity: </strong>
//                   {selectedSong.popularity}
//                 </S.PopupSongDetail>
//                 <S.PopupSongDetail>
//                   <strong>Release Date: </strong>
//                   {selectedSong.album.release_date}
//                 </S.PopupSongDetail>
//               </S.PopupSongInfo>
//               <S.CloseButton onClick={handleClosePopup}>닫기</S.CloseButton>
//             </S.Popup>
//           </S.Overlay>
//         )}
//       </AnimatePresence>
//       <div ref={loader} />
//       <S.HeaderText>마음에 든 노래 </S.HeaderText>
//       {trackInfos_like.length === 0 ? (
//         <S.NoSongsMessage>좋아요를 누른 노래가 없습니다</S.NoSongsMessage>
//       ) : (
//         <S.SliderContainer
//           ref={sliderRef}
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//         >
//           {trackInfos_like
//             .filter((song) => likedSongs.includes(song.id))
//             .map((song, index) => (
//               <S.SliderItem key={`${song.id}-${index}`}>
//                 <S.AlbumCover
//                   src={song.album.images[0].url}
//                   alt="song album"
//                   draggable="false"
//                   onClick={() => handleSongClick(song)}
//                 />
//                 <S.SongDetails>
//                   <S.SongTitle>{song.album.name}</S.SongTitle>
//                   <S.ArtistName>
//                     {song.artists.map((artist) => artist.name).join(" ")}
//                   </S.ArtistName>
//                 </S.SongDetails>
//                 <S.HeartButton
//                   onClick={() => handleLikeToggle_like(song.id, song.liked)}
//                 >
//                   {song.liked ? "❤️" : "🤍"}
//                 </S.HeartButton>
//               </S.SliderItem>
//             ))}
//         </S.SliderContainer>
//       )}
//     </S.Container>
//   );
// }

// export default SongsPage;
