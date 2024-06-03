import styled, { keyframes } from "styled-components";


const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 0.8));
  background-size: cover;
  position: relative;
  overflow: hidden;
`;

export const Title = styled.h1`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 24px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transform: translateY(-50%);
  margin-bottom: 50px; /* Adjust as necessary */
  right:20%;
  bottom:30%;
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
