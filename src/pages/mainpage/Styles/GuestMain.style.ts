import styled, { keyframes } from "styled-components";

const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #000428, #004e92);
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
  position: absolute;
  right: 10%;
`;

export const Logo = styled.h2`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

export const StartButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Star = styled.div`
  width: 2px;
  height: 2px;
  background: white;
  position: absolute;
  top: ${(props) => Math.random() * 100}%;
  left: ${(props) => Math.random() * 100}%;
  animation: ${twinkle} 1.5s infinite ease-in-out;
`;
