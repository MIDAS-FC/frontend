import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [socialType, setSocialType] = useState("SoundOfFlower");
  const [role, setRole] = useState("USER");
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
      const accessToken = response.headers["authorization-access"];
      const nickName = response.headers["nickname"];

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("nickName", nickName);
      localStorage.setItem("email", email);
      localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 저장

      // axios 기본 헤더에 토큰 설정
      axios.defaults.headers.common["Authorization-Access"] = `${accessToken}`;

      // 사용자 정보 업데이트
      setNickname(nickName); // 닉네임
      setAuthEmail(email); // 이메일
      setIsLoggedIn(true);
      // 홈페이지로 이동
      console.log(nickName);
      console.log(accessToken);
      navigate("/");
    } catch (error) {
      // Handle error here
      console.error(error);
    }
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
    <Container>
      <LoginPage>
        <LoginForm>
          <LoginFuncion onSubmit={handleSubmit}>
            <LoginInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e-mail"
              type="email"
            />
            <LoginInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type="password"
            />
            <LoginBtn type="submit">LOGIN</LoginBtn>
          </LoginFuncion>
          <Gray>아직 회원이 아니신가요?</Gray>
          <Link to="/Join">
            <Red>회원가입</Red>
          </Link>
          <SNS>
            <Kakao onClick={handleKakaoLogin}></Kakao>
            <Naver onClick={handleNaverLogin}></Naver>
            <Google onClick={handleGoogleLogin}></Google>
          </SNS>
        </LoginForm>
      </LoginPage>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  height: 120vh;
  top: 100px;
`;

const LoginPage = styled.div`
  width: 100%;
  height: 100%;
  background: #ffb8b3;
  overflow: auto;
`;

const LoginForm = styled.div`
  background: #ffffff;
  width: 30%;
  margin: 100px auto 0 auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
`;

const LoginFuncion = styled.form``;

const LoginInput = styled.input`
  outline: 0;
  width: 100%;
  margin: 0 0 15px;
  padding: 15px 0;
  box-sizing: border-box;
  font-size: 14px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #ccc;
`;

const LoginBtn = styled.button`
  text-transform: uppercase;
  outline: 0;
  background: #ff8379;
  width: 100%;
  border: 0;
  padding: 15px;
  margin-bottom: 30px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const Gray = styled.span`
  color: #b3b3b3;
`;

const Red = styled.span`
  margin: 0 5px;
  color: #ff8379;
  &:hover {
    text-decoration: underline;
  }
`;

const SNS = styled.div`
  position: relative;
  top: 25px;
  width: 100%;
  height: 30px;
`;

const Kakao = styled.button`
  width: 34.31px;
  height: 30.8px;
  background: #ffc700;
  border-radius: 50%;
  border: none;
  margin-right: 10px;
`;

const Naver = styled.button`
  width: 34.31px;
  height: 30.8px;
  border: none;
  background: #52d700;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;

const Google = styled.button`
  width: 34.31px;
  height: 30.8px;
  border: none;
  background: #e0e0e0;
  border-radius: 50%;
`;
