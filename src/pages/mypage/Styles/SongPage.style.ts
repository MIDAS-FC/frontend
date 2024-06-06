import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height:500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 20px;
`;

export const ScrollableContainer = styled.div`
  position: relative;
  width: 100%;
  heigth:400px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const SliderContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 350px;
  padding: 10px;
  position: relative;
  cursor: grab;

  &.active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SliderItem = styled(motion.div)`
  position:relative;
  flex: 0 0 auto;
  width: 250px;
  height: 400px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  scroll-snap-align: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(1, 0, 0, 0.2);
  }

  &:last-child {
    margin-right: 0;
  }

  &.removing {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
`;

export const TopSliderItem = styled(motion.div)`
  position:relative;
  flex: 0 0 auto;
  width: 250px;
  height: 400px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  scroll-snap-align: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(1, 0, 0, 0.2);
  }

  &:last-child {
    margin-right: 0;
  }

  &.removing {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

    &:nth-child(1) {
    background-color: #ffeb3b;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(255, 235, 59, 0.4);
  }

  &:nth-child(2) {
    background-color: #ff5722;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(255, 87, 34, 0.4);
  }

  &:nth-child(3) {
    background-color: #4caf50;
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(76, 175, 80, 0.4);
  }
`;

export const TopArtistName = styled.p<{ index: number }>`
  font-size: 16px;
  margin: 0;

  color: ${({ index }) =>
    index === 0 ? "#333" : index === 1 ? "#333" : index === 2 ? "#333" : "#888"};

`;

export const HeaderText = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

export const AlbumCover = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export const SongDetails = styled.div`
  position: relative;
`;

export const SongTitle = styled.p`
  font-size: 18px;
  margin: 5px 0;
  font-weight: bold;
  color: #333;
`;

export const ArtistName = styled.p`
  font-size: 16px;
  color: #888;
  margin: 0;
`;

export const NoSongsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadMoreButton = styled.button`
  background-color: #87ceeb;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00bfff;
  }

  &:disabled {
    background-color: #87ceeb;
    cursor: not-allowed;
  }
`;

export const LikeButton = styled.button`
  position:absolute;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 2rem;
  color: #ff4d4d;
  right: 0;
  top:0;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const ScrollButton = styled.button`
  background: none;
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  margin: 0 10px;
  position: relative;
  height: 350px;
  transform: translateY(0%);
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Popup = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
  width: 400px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
`;

export const PopupAlbumCover = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

export const PopupSongTitle = styled.h3`
  font-size: 22px;
  margin: 10px 0;
  font-weight: bold;
  color: #333;
`;

export const PopupArtistName = styled.p`
  font-size: 18px;
  color: #888;
  margin: 10px;
`;

export const PopupSongInfo = styled.div`
  text-align: left;
  margin: 10px;
`;

export const PopupSongDetail = styled.p`
  font-size: 16px;
  color: #333;
  margin: 10px 0;
`;

export const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #87ceeb;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00bfff;
  }
`;