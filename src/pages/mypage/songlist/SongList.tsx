import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as S from "../Styles/SongList.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const songs = [
  {
    albumCover: "path/to/cover1.jpg",
    title: "Song 1",
    artist: "Artist 1",
  },
  {
    albumCover: "path/to/cover2.jpg",
    title: "Song 2",
    artist: "Artist 2",
  },
  {
    albumCover: "path/to/cover3.jpg",
    title: "Song 3",
    artist: "Artist 3",
  },
  {
    albumCover: "path/to/cover4.jpg",
    title: "Song 4",
    artist: "Artist 4",
  },
];

function SongList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const nextSlide = () => {
    if (leaving) return;
    toggleLeaving();
    setDirection(1);
    setCurrentIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (leaving) return;
    toggleLeaving();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  return (
    <div>
      <h2>마음에 든 노래</h2>
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
            key={currentIndex}
            custom={direction}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {songs.map((song, index) => (
              <S.SliderItem key={index}>
                <S.AlbumCover
                  src={song.albumCover}
                  alt={`${song.title} cover`}
                />
                <S.SongDetails>
                  <S.SongTitle>{song.title}</S.SongTitle>
                  <S.ArtistName>{song.artist}</S.ArtistName>
                </S.SongDetails>
              </S.SliderItem>
            ))}
          </S.Row>
        </AnimatePresence>
        <S.Arrow onClick={nextSlide} position="right">
          <FontAwesomeIcon icon={faChevronRight} />
        </S.Arrow>
      </S.SliderContainer>
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
