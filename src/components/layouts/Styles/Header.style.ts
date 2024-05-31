import styled from "styled-components";

interface HeaderContainerProps {
  $isScrolled: boolean;
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${(props) =>
    props.$isScrolled ? "rgba(0, 0, 0, 0)" : "rgba(135, 206, 235, 0.8)"};
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
  border-radius: 50px;
  cursor: pointer;
`;

export const LeftButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RightButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto; /* 오른쪽 끝에 붙이기 위해 왼쪽으로 밀기 */
`;

export const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background: #5dade2;
  color: #fff;
  transition: background-color 0.3s;
  &:hover {
    background-color: #add8e6;
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
