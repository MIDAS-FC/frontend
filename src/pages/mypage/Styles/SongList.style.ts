import styled from "styled-components";
import { motion } from "framer-motion";

export const SliderContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
`;

export const SliderItem = styled(motion.div)`
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

export const Arrow = styled.div<{ position: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: black;
  background-color: gray;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  user-select: none;
  position: absolute;
  top: 50%;
  ${(props) => (props.position === "left" ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);

  &:hover {
    background-color: darkgray;
  }
`;

export const Row = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
