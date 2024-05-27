import styled from "styled-components";
import { motion } from "framer-motion";

export const SliderContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const SliderItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const AlbumCover = styled.img`
  width: 120px;
  height: 120px;
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

export const Arrow = styled.div<{ position: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: white;
  background-color: #add8e6;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  user-select: none;
  position: absolute;
  top: 50%;
  ${(props) => (props.position === "left" ? "left: 20px;" : "right: 20px;")}
  transform: translateY(-50%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #87ceeb;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const Row = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const NoSongsMessage = styled.div`
  text-align: center;
  margin-top: 80px;
  font-size: 18px;
  color: #666;
`;
