import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const Container = styled.div`
  width: 100%;
  height:100vh;
  background: linear-gradient(to bottom, rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 0.8));
  position: relative;
  padding: 150px;
`;

export const Title = styled.h1`
  top: 20px;
  left: 20px;
  color: white;
  font-size: 24px;
  text-align:right;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transform: translateY(-50%);
  margin-bottom: 50px;
`;

export const Logo = styled.h2`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

export const Bigtext = styled.p`
  color: white;
  font-size: 2vw; /* 반응형 폰트 크기 */
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 4vw;
  }

  @media (max-width: 480px) {
    font-size: 6vw;
  }
`;

export const Smalltext = styled.p`
  color: white;
  font-size: 1.5vw; /* 반응형 폰트 크기 */
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 3vw;
  }

  @media (max-width: 480px) {
    font-size: 5vw;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const StartButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #87ceeb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #00bfff;
  }
`;

export const Star = styled.div`
  width: 4px;
  height: 4px;
  background: #f8f8ff;
  border-radius: 100%;
  position: absolute;
  top: ${(props) => Math.random() * 100}%;
  left: ${(props) => Math.random() * 100}%;
  animation: ${twinkle} 1.5s infinite ease-in-out;
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled(motion.div)`
  position: absolute;
  width: 600px;
  margin-top: -300px;
  padding: 20px;
  border-radius: 20px;
  background-color: #f0f8ff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0.3s ease;
  border: 2px solid #87ceeb;

  &:hover {
    background-color: #e6f2ff;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;


export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  margin: 20px 0;
  img {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    margin: 0 10px;
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
  font-family: 'Georgia', serif;
`;

export const InfoText = styled.div`
  font-size: 16px;
  color: #666;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  margin-bottom: 10px;
  font-family: 'Georgia', serif;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

export const Button = styled.button`
  background: #87ceeb;
  border: none;
  border-radius: 20px;
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
  width: 160px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Flower = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

export const PopupBox = styled(motion.div)`
  position: absolute;
  top: 50px;
  right: -50px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 150px;
  text-align: center;
  font-size: 12px;
  line-height: 1.4;
`;

export const CloseButton = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #333;
  transition: color 0.3s ease;
  initial={{ x: 20, y: -20, opacity: 0 }}
  animate={{ x: 0, y: 0, opacity: 1 }}
  transition={{ duration: 0.3, ease: "easeInOut" }}

  &:hover {
    color: #666;
  }
`;