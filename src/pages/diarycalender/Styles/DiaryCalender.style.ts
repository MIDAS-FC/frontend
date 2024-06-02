import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import backgroundImage from "src/assets/images/background.webp";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #fafafa;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
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
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    background-color: rgba(245, 245, 245, 0.8);
    transform: scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
  border: 2px solid #87ceeb;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  margin: 55px 20px 0px 0px;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    margin: 0px 10px 10px 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  margin: 15px;
`;

export const InfoText = styled.div`
  font-size: 16px;
  color: #333;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  margin: 15px;
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

export const FlowerImageContainer = styled.div`
  position: absolute;
  top: -14px;
  left: -14px;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Flower = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
