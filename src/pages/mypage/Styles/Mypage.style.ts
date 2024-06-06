import styled, { keyframes } from "styled-components";

const twinkle = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
`;

const gradientBackground = `
    background: linear-gradient(to bottom, rgba(0, 4, 40, 0.8), rgba(0, 78, 146, 0.8));
    background-size: cover;
`;

export const Star = styled.div`
  width: 4px;
  height: 4px;
  background: #f8f8ff;
  border-radius: 100%;
  position: absolute;
  animation: ${twinkle} 1.5s infinite ease-in-out;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  ${gradientBackground}
`;

export const Section = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 170px;

  &:last-child {
    margin-bottom: 0;
  }
`;
