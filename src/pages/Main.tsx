import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../AuthProvider";

axios.defaults.baseURL = "/auth";

// 첫 접속하면 "/guest"로, 로그인을 진행하면 "/"로 이동

const Main: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLoggedIn, setIsLoggedIn, nickname, email } = useAuth();

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const handleJoinClick = () => {
    navigate("/Join");
  };

  const handleLogoutClick = () => {
    alert("로그아웃 성공.");
    localStorage.removeItem("accessToken"); // 토큰 삭제
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("nickName");
    localStorage.removeItem("email");
    setIsLoggedIn(false); // 로그인 상태를 false로 변경
    navigate("/"); // 홈페이지로 이동
  };

  const onClick1 = () => {
    navigate("/DiaryCalender");
  };

  const onClick2 = () => {
    navigate("/WeeklyReport");
  };

  return (
    <>
      <Container>
        <ButtonContainer>
          {!isLoggedIn ? (
            <>
              <Button onClick={handleLoginClick}>로그인</Button>
              <Button onClick={handleJoinClick}>회원가입</Button>
            </>
          ) : (
            <>
              <p>{email}</p>
              <Button onClick={onClick1}>마이페이지</Button>
              <Button onClick={onClick2}>주간감정레포트</Button>
              <Button onClick={handleLogoutClick}>로그아웃</Button>
            </>
          )}
        </ButtonContainer>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #1c1c2e;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const ButtonContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background: #d38b8b;
  color: #fff;
`;
