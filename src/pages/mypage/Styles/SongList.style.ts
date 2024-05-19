import styled from "styled-components";

export const SliderContainer = styled.div`
  width: 100%;
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slick-dots {
    bottom: -30px;
  }
`;

export const SliderItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const AlbumCover = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

export const SongDetails = styled.div`
  text-align: center;
`;

export const SongTitle = styled.p`
  font-size: 14px;
  margin: 0;
`;

export const ArtistName = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
`;
