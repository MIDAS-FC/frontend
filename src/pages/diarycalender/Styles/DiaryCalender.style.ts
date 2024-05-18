import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled(motion.div)`
  width: 600px;
  height: 300px;
  position: relative;
  margin-top: 20px;
  border-radius: 20px;
  background-color: #f0f0f0;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const ButtonsContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  background: #f0f0f0;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`;
