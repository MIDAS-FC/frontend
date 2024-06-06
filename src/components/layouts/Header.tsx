import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import logo from "../../assets/icons/logo.webp";
import * as S from "../layouts/Styles/Header.style";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, nickname, email } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const role = localStorage.getItem("role");

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleAdminClick = () => {
    navigate("/AdminJoin");
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const handleJoinClick = () => {
    navigate("/Join");
  };

  const handleLogoutClick = async () => {
    try {
      await axios.post(
        "http://localhost:8080/token/logout",
        {},
        {
          headers: {
            "Authorization-Access": `Bearer ${token}`,
            "Authorization-Refresh": `Bearer ${refreshToken}`,
          },
        }
      );

      alert("로그아웃 성공.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("nickName");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      delete axios.defaults.headers.common["Authorization-Access"];
      delete axios.defaults.headers.common["Authorization-Refresh"];

      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleWriteDiaryClick = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    navigate(`/WriteDiary?year=${year}&month=${month}&day=${day}`);
  };

  const handleCalendarClick = () => {
    navigate("/");
  };

  const handleMypageClick = () => {
    navigate("/mypage");
  };

  const handleAdminPageClick = () => {
    navigate("/AdminPage"); // 관리자 페이지 경로
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
      {isLoggedIn && (
        <S.LeftButtonContainer>
          <S.LinkButton onClick={handleWriteDiaryClick}>일기작성</S.LinkButton>
          {role === "ADMIN" ? (
            <S.LinkButton onClick={handleAdminPageClick}>
              관리자페이지
            </S.LinkButton>
          ) : (
            <S.LinkButton onClick={handleCalendarClick}>캘린더</S.LinkButton>
          )}
          <S.LinkButton onClick={handleMypageClick}>마이페이지</S.LinkButton>
        </S.LeftButtonContainer>
      )}
      <S.RightButtonContainer>
        {!isLoggedIn ? (
          <>
            <S.Button onClick={handleAdminClick}>관리자 회원가입</S.Button>
            <S.Button onClick={handleLoginClick}>로그인</S.Button>
            <S.Button onClick={handleJoinClick}>회원가입</S.Button>
          </>
        ) : (
          <S.Button onClick={handleLogoutClick}>로그아웃</S.Button>
        )}
      </S.RightButtonContainer>
    </S.HeaderContainer>
  );
}

export default Header;
