import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const SliderContainer = styled.div`
  width: 100%;
  max-width: calc(250px * 4 + 15px * 3);
  margin: 0 auto;
  overflow-x: hidden;
  display: flex;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
  scroll-behavior: smooth;

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

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const HeaderText = styled.h2`
  font-size: 24px;
  color: #333;
`;

export const AlbumCover = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SongDetails = styled.div`
  text-align: center;
`;

export const SongTitle = styled.p`
  font-size: 16px;
  margin: 5px 0;
  font-weight: bold;
  color: #333;
`;

export const ArtistName = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

export const HeartButton = styled.button`
  position: absolute;
  right: 15px;
  bottom: 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;

  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const NoSongsMessage = styled.div`
  text-align: center;
  margin-top: 80px;
  font-size: 18px;
  color: #666;
`;
