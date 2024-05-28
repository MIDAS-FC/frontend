import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as S from "../Styles/SongList.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../../axiosInterceptor.js";

// 임시
interface Song {
  albumCover: string;
  title: string;
  artist: string;
}

function SongList() {
  const [songs, setSongs] = useState<Song[]>([]);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);

  // // 토큰 관련
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
  //     console.log("Access token retrieved:", token);
  //   } else {
  //     console.log("token error");
  //   }
  // }, []);

  const fetchLikes = useCallback(async (pageToFetch: number) => {
    try {
      console.log(`Fetching likes for page: ${pageToFetch}`);
      const response = await api.get("/music/likes", {
        params: { page: pageToFetch, size: 5 },
      });
      const { data, last } = response.data;
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

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const nextSlide = () => {
    if (leaving || last) {
      console.log(
        "Cannot go to the next slide, leaving:",
        leaving,
        "last:",
        last
      );
      return;
    }
    console.log("Going to the next slide");
    toggleLeaving();
    setDirection(1);
    setPage((prevPage) => prevPage + 1);
    // setCurrentIndex(0);
  };

  const prevSlide = () => {
    if (leaving || page === 1) {
      console.log(
        "Cannot go to the previous slide, leaving:",
        leaving,
        "page:",
        page
      );
      return;
    }
    console.log("Going to the previous slide");
    toggleLeaving();
    setDirection(-1);
    setPage((prevPage) => prevPage - 1);
    // setCurrentIndex(0);
  };

  return (
    <div>
      <h2>마음에 든 노래</h2>
      {songs.length === 0 ? (
        <S.NoSongsMessage>좋아요를 누른 노래가 없습니다</S.NoSongsMessage>
      ) : (
        <S.SliderContainer>
          <S.Arrow onClick={prevSlide} position="left">
            <FontAwesomeIcon icon={faChevronLeft} />
          </S.Arrow>
          <AnimatePresence
            initial={false}
            custom={direction}
            onExitComplete={toggleLeaving}
          >
            <S.Row
              key={page}
              custom={direction}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {songs.map((song, index) => (
                <S.SliderItem key={index}>
                  <S.AlbumCover
                  // src={song.albumCover}
                  // alt={`${song.title} cover`}
                  />
                  <S.SongDetails>
                    {/* <S.SongTitle>{song.title}</S.SongTitle>
                <S.ArtistName>{song.artist}</S.ArtistName> */}
                  </S.SongDetails>
                </S.SliderItem>
              ))}
              {/*
            {songs.slice(currentIndex, currentIndex + 5).map((song, index) => (
              <S.SliderItem key={index}>
                <S.AlbumCover
                // src={song.albumCover}
                // alt={`${song.title} cover`}
                />
                <S.SongDetails>
                  {/* <S.SongTitle>{song.title}</S.SongTitle>
                  <S.ArtistName>{song.artist}</S.ArtistName> */}
              {/* </S.SongDetails>
              </S.SliderItem>
            ))} */}
            </S.Row>
          </AnimatePresence>
          <S.Arrow onClick={nextSlide} position="right">
            <FontAwesomeIcon icon={faChevronRight} />
          </S.Arrow>
        </S.SliderContainer>
      )}
    </div>
  );
}

export default SongList;

const rowVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};
