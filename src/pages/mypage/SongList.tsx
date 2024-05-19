import React from "react";
import Slider from "react-slick";
import * as S from "./Styles/SongList.style";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <S.SliderContainer>
      <Slider {...settings}>
        {songs.map((song, index) => (
          <S.SliderItem key={index}>
            <S.AlbumCover src={song.albumCover} alt={`${song.title} cover`} />
            <S.SongDetails>
              <S.SongTitle>{song.title}</S.SongTitle>
              <S.ArtistName>{song.artist}</S.ArtistName>
            </S.SongDetails>
          </S.SliderItem>
        ))}
      </Slider>
    </S.SliderContainer>
  );
}

export default SongList;
