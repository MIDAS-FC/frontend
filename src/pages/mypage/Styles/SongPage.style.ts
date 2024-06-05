import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 20px;
`;

export const SliderContainer = styled.div`
  width: 100%;
  max-width: calc(250px * 4 + 15px * 3);
  margin: 0 auto 50px auto;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
  scroll-behavior: smooth;
  height: 350px;
  border-radius: 20px;
  padding: 10px;

  &:active {
    cursor: grabbing;
  }
`;

export const SliderItem = styled(motion.div)`
  position: relative;
  flex: 0 0 auto;
  width: 250px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  scroll-snap-align: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    margin-right: 0;
  }
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

  &:hover {
    transform: scale(1.05);
  }
`;

export const SongDetails = styled.div`
  text-align: center;
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

export const HeartButton = styled.button`
  position: absolute;
  right: 15px;
  bottom: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: #ff6b6b;
  }
`;

export const NoSongsMessage = styled.div`
  text-align: center;
  margin-top: 80px;
  font-size: 20px;
  color: #666;
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
    background-color: #bfefff;
  }
`;