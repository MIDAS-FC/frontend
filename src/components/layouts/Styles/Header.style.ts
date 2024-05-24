import styled from "styled-components";

interface HeaderContainerProps {
  isScrolled: boolean;
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${(props) =>
    props.isScrolled ? "transparent" : "rgba(135, 206, 235, 0.1)"};
  transition: background 0.3s ease;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

export const Logo = styled.img`
  height: 50px;
  width: auto;
  margin-right: 20px;
  cursor: pointer;
`;
