import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import logo from "../../assets/icons/logo.jpg";
import * as S from "../layouts/Styles/Header.style";

function Header() {
  const navigate = useNavigate();
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

  const decondeNickname = decodeURIComponent(nickname);

  return (
    <S.HeaderContainer>
      <S.Logo src={logo} alt="Logo" />
      {!isLoggedIn ? (
        <>
          <S.Button onClick={handleLoginClick}>로그인</S.Button>
          <S.Button onClick={handleJoinClick}>회원가입</S.Button>
        </>
      ) : (
        <>
          <p>{decondeNickname} 님 어서오세요.</p>
          <S.Button onClick={handleLogoutClick}>로그아웃</S.Button>
        </>
      )}
      
    </S.HeaderContainer>
  );
}

export default Header;
