import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  height: auto;
  position: relative;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
  border: 2px solid #87ceeb; /* 추가된 테두리 색상 */
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const InfoContainer = styled.div`
  margin: 10px 0;
`;

export const InfoTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

export const InfoText = styled.div`
  font-size: 16px;
  color: #666;
`;

export const ButtonsContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  background: #87ceeb;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    background: #6495ed;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;
