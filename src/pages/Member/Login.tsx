// src/pages/Member/Login.tsx
import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  /* min-width: 1280px; */
  height: 120vh;
  top: 100px;
`;

const LoginPage = styled.div`
  /* LoginPage */
  width: 100%;
  height: 100%;
  background: #FFB8B3;
  overflow: auto;
`
const LoginForm = styled.div`
  background: #FFFFFF;
  width: 30%;
  margin:100px auto 0 auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
`

const LoginFuncion = styled.form`
`

const LoginInput = styled.input`
  outline: 0;
  width: 100%;
  margin: 0 0 15px;
  padding: 15px 0;
  box-sizing: border-box;
  font-size: 14px;
  border-top:none;
  border-right:none;
  border-left:none;
  border-bottom:1px solid #ccc;
`

const LoginBtn = styled.button`
  text-transform: uppercase;
  outline: 0;
  background: #FF8379;
  width: 100%;
  border: 0;
  padding: 15px;
  margin-bottom:30px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
`

//회원가입 text link
const Gray = styled.span`
  color:#b3b3b3;
`
const Red = styled.span`
  margin:0 5px;
  color:#FF8379;

  &:hover {
    text-decoration: underline;
  }
`

const SNS = styled.div`
  position:relative;
  top:25px;
  width:100%;
  height:30px;
`

const Kakao = styled.button`
  width: 34.31px;
  height: 30.8px;
  background: #E0E0E0;
  border-radius:50%;
  border:none;
  margin-right: 10px;
`

const Naver = styled.button`
  width: 34.31px;
  height: 30.8px;
  border:none;
  background: #FFC700;
  border-radius:50%;
  margin-right: 10px;

`

const Google = styled.button`
  width: 34.31px;
  height: 30.8px;
  border:none;
  background: #52D700;
  border-radius:50%;
`

const Login = () => {

  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
  
    if(!username){
      alert('아이디를 입력해주세요.');
      return;
    }else if(!password){
      alert('패스워드를 입력해주세요.');
      return;
    }
  };

  return (
    <Container>
    <LoginPage>
      <LoginForm>
        <LoginFuncion onSubmit={handleSubmit}>
          <LoginInput ref={usernameRef} placeholder="username" type="id"></LoginInput>
          <LoginInput ref={passwordRef} placeholder="password" type="password"></LoginInput>
          <LoginBtn>LOGIN</LoginBtn>
        </LoginFuncion>
        <Gray>아직 회원이 아니신가요?</Gray><Link to="/pages/Member/Join"><Red>회원가입</Red></Link>
        <SNS>
          <Kakao></Kakao>
          <Naver></Naver>
          <Google></Google>
        </SNS>
      </LoginForm>
    </LoginPage>
    </Container>
  );
};

export default Login;
