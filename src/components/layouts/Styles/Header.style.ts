import styled, { keyframes } from "styled-components";

interface HeaderContainerProps {
  $isScrolled: boolean;
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  background:none;
  transition: background 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

export const Logo = styled.img`
  height: 50px;
  width: auto;
  border-radius: 50px;
  cursor: pointer;
`;

export const LeftButtonContainer = styled.div`
  display: flex;
`;

export const RightButtonContainer = styled.div`
  align-items: center;
  justify-content: flex-end;
  position:absolute;
  right: 50px;
`;

const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background: none;
  color: #fff;
  transition: transform 1s;
  &:hover {
    transform: scale(1.05);
    animation: ${twinkle} 1.5s infinite ease-in-out;
  }
`;

export const LinkButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background: transparent;
  color: black;
  transition: color 0.3s, background-color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
`;
