import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 4, 40, 0.8),
    rgba(0, 78, 146, 0.8)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center; /* 중앙 정렬 */
  align-items: flex-start;
  padding-top: 20px;
`;

export const BoxContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin-right: 0; /* 오른쪽 마진 제거 */
`;

export const Box = styled(motion.div)`
  width: 100%;
  padding: 20px;
  border-radius: 20px 0 0 20px;
  background-color: #f0f8ff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 2px solid #87ceeb;
`;

export const FlowerImageContainer = styled.div`
  position: relative;
  top: -14px;
  left: -14px;
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Flower = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

export const PopupBox = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: -120px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 200px;
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
  &:hover {
    color: #666;
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
  font-family: "Georgia", serif;
`;

export const InfoText = styled.div`
  font-size: 16px;
  color: #666;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  margin-bottom: 10px;
  font-family: "Georgia", serif;
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

export const Title = styled.h1`
  color: white;
  font-size: 24px;
  text-align: center;
  margin-top: 140px;
  position: relative;
  transform: translateX(300px); /* 약간 오른쪽으로 이동 */
`;
