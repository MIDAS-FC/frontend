import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import * as S from "./Styles/Member.style";

const generateStarPositions = (numStars: number) => {
  return Array.from({ length: numStars }).map(() => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
  }));
};

const Stars = () => {
  const [starPositions, setStarPositions] = useState(generateStarPositions(50));

  useEffect(() => {
    setStarPositions(generateStarPositions(50));
  }, []);

  return (
    <>
      {starPositions.map((pos, index) => (
        <S.Star key={index} style={{ top: pos.top, left: pos.left }} />
      ))}
    </>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [socialType] = useState("SoundOfFlower");
  const { setIsLoggedIn, setNickname, setEmail: setAuthEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      email,
      password,
      socialType,
      role,
    };

    try {
      const response = await axios.post("/token/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 응답 헤더에서 AccessToken 추출
      const accessToken =
        response.headers["authorization-access"].split(" ")[1];
      const refreshToken =
        response.headers["authorization-refresh"].split(" ")[1];
      const nickName = response.headers["nickname"];
      const fileUrl = response.headers["multipartFile"] || "default-image-url";

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("nickName", nickName);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role); // role 값을 로컬 스토리지에 저장
      localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 저장
      localStorage.setItem("fileUrl", fileUrl);

      // axios 기본 헤더에 토큰 설정
      axios.defaults.headers.common[
        "authorization-access"
      ] = `Bearer ${accessToken}`;
      axios.defaults.headers.common[
        "authorization-refresh"
      ] = `Bearer ${refreshToken}`;

      // 사용자 정보 업데이트
      setNickname(nickName); // 닉네임
      setAuthEmail(email); // 이메일
      setIsLoggedIn(true);

      // 홈페이지로 이동
      console.log(nickName);
      console.log(accessToken);
      console.log(refreshToken);
      navigate("/");
    } catch (error) {
      // Handle error here
      console.error(error);
      alert("Login failed. Please check your email and password.");
    }
  };

  const handleUserLogin = () => {
    setRole("USER");
  };

  const handleAdminLogin = () => {
    setRole("ADMIN");
  };

  const handleNaverLogin = async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  const handleKakaoLogin = async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <S.Container>
      <Stars />
      <S.LoginForm>
        <S.LoginFuncion onSubmit={handleSubmit}>
          <S.LoginInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e-mail"
            type="email"
            required
            autoComplete="username"
          />
          <S.LoginInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
            required
            autoComplete="current-password"
          />
          <S.LoginBtnGroup>
            <S.LoginBtn type="submit" onClick={handleUserLogin}>
              USER
            </S.LoginBtn>
            <S.LoginBtn type="submit" onClick={handleAdminLogin}>
              Admin
            </S.LoginBtn>
          </S.LoginBtnGroup>
          {/* 자동 완성 기능 향상 및 보안 및 접근성 강화 */}
          <input
            type="text"
            name="username"
            value={email}
            autoComplete="username"
            style={{ display: "none" }}
            readOnly
          />
        </S.LoginFuncion>
        <S.Gray>아직 회원이 아니신가요?</S.Gray>
        <Link to="/Join">
          <S.Red>회원가입</S.Red>
        </Link>
        <S.SNS>
          <S.Kakao onClick={handleKakaoLogin}></S.Kakao>
          <S.Naver onClick={handleNaverLogin}></S.Naver>
          <S.Google onClick={handleGoogleLogin}></S.Google>
        </S.SNS>
      </S.LoginForm>
    </S.Container>
  );
};

export default Login;
