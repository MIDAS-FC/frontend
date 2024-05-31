import styled from "styled-components";
import { motion } from "framer-motion";

export const SliderContainer = styled.div`
  width: 100%;
  overflow-x: hidden; /* Hide horizontal scrollbar */
  display: flex;
  scroll-snap-type: x mandatory; /* Snap scroll effect */
  -webkit-overflow-scrolling: touch; /* Enable touch scrolling on mobile */
  cursor: grab;
  scroll-behavior: smooth; /* Smooth scroll for natural movement */

  &:active {
    cursor: grabbing;
  }
`;

export const SliderItem = styled(motion.div)`
  flex: 0 0 auto; /* Align items in a row */
  width: 200px; /* Set width for each item */
  margin-right: 10px; /* Set space between items */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  scroll-snap-align: start; /* Snap alignment */

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

export const NoSongsMessage = styled.div`
  text-align: center;
  margin-top: 80px;
  font-size: 18px;
  color: #666;
`;
