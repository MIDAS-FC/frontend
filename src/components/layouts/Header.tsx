import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import React, { useState, useEffect } from "react";
import logo from "../../assets/icons/logo.webp";
import * as S from "../layouts/Styles/Header.style";

axios.defaults.baseURL = "/auth";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, nickname, email } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.HeaderContainer $isScrolled={isScrolled}>
      <S.Logo src={logo} alt="Logo" onClick={handleLogoClick} />
      {!isLoggedIn ? (
        <>
          <S.Button onClick={handleLoginClick}>로그인</S.Button>
          <S.Button onClick={handleJoinClick}>회원가입</S.Button>
        </>
      ) : (
        <>
          <S.Button onClick={handleLogoutClick}>로그아웃</S.Button>
        </>
      )}
    </S.HeaderContainer>
  );
}

export default Header;
