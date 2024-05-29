import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

axios.defaults.baseURL = "/auth";

const Join = () => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [randomNum, setRandomNum] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate(); // Create a navigate object

  // 이메일 인증번호 보내기
  const sendEmail = async () => {
    try {
      const response = await axios.post("/email", {
        email,
        emailType: "sign-up",
        socialType: "SoundOfFlower",
      });
      setRandomNum(response.data.randomNum);
      alert("인증번호가 전송되었습니다.");
      setIsSend(true);
    } catch (error) {
      console.error("인증번호 전송 오류:", error);
    }
  };

  // 인증
  const verifyEmail = async () => {
    try {
      const response = await axios.post("/register/authentication/number", {
        email,
        socialType: "SoundOfFlower",
        randomNum,
        inputNum: verificationCode,
        sendTime: new Date(),
        expireTime: new Date(new Date().getTime() + 30 * 1000), //인증번호 유효시간 30초
        emailType: "sign-up", // 또는 "reset-password" 등의 유효한 값
      });
      alert("인증 성공!");
      setIsVerified(true);
    } catch (error) {
      alert("인증 실패. 다시 시도해 주세요.");
    }
  };

  // 이메일 재전송
  const resendEmail = async () => {
    try {
      await axios.post("/resend-email", { email });
      alert("이메일을 재전송했습니다.");
    } catch (error) {
      console.error("이메일 재전송 오류:", error);
      alert("이메일을 재전송하는 동안 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복 여부 확인
  const verifyNickname = async () => {
    try {
      const response = await axios.post("/register/authentication/nickname", {
        nickName,
      });
      if (response.status === 204) {
        alert("사용가능한 닉네임입니다.");
      }
    } catch (error) {
      if (
        error instanceof axios.AxiosError &&
        error.response &&
        error.response.status === 409
      ) {
        alert("이미 사용하고있는 닉네임입니다. 다른 닉네임을 사용해주세요.");
      } else {
        console.log("Error verifying nickname:", error);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // 회원가입
  const register = async () => {
    const formData = new FormData();
    formData.append("file", file || "");

    const userRequestDto = {
      email,
      nickName,
      password,
    };

    const userRequestDtoBlob = new Blob([JSON.stringify(userRequestDto)], {
      type: "application/json",
    });

    formData.append("userRequestDto", userRequestDtoBlob);

    try {
      const response = await axios.post("/register", formData);

      console.log(response.data);

      alert("회원가입이 완료되었습니다.");
      navigate("/Login"); //로그인 페이지로 유도
    } catch (error) {
      console.error("Error during registration:", error);
    }

    console.log("Registered with the following data:");
    console.log("email:", email);
    console.log("NickName:", nickName);
    console.log("Password:", password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register();
  };

  return (
    <Container>
      <JoinPage>
        <JoinForm>
          <JoinInput
            disabled={isSend}
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <JoinBtn type="button" onClick={sendEmail} disabled={isSend}>
            인증번호 전송
          </JoinBtn>
          <JoinInput
            disabled={isVerified}
            name="verificationCode"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <JoinBtn type="button" onClick={verifyEmail} disabled={isVerified}>
            인증하기
          </JoinBtn>
          <JoinBtn type="button" onClick={resendEmail}>
            이메일 재전송
          </JoinBtn>
          <JoinInput
            name="nickName"
            placeholder="nickname"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <JoinBtn type="button" onClick={verifyNickname}>
            중복 확인
          </JoinBtn>
          <JoinFunction onSubmit={handleSubmit}>
            <JoinInput
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="file" name="file" onChange={handleFileChange} />
            <JoinBtn type="submit">Sign up</JoinBtn>
          </JoinFunction>
        </JoinForm>
      </JoinPage>
    </Container>
  );
};

export default Join;

const Container = styled.div`
  position: relative;
  height: 120vh;
  top: 100px;
`;

const JoinPage = styled.div`
  width: 100%;
  height: 100%;
  background: #ffb8b3;
  overflow: auto;
`;

const JoinForm = styled.div`
  background: #ffffff;
  width: 30%;
  margin: 100px auto 0 auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
`;

const JoinFunction = styled.form``;

const JoinInput = styled.input`
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
const JoinBtn = styled.button`
  text-transform: uppercase;
  outline: 0;
  background: #ff8379;
  width: 100%;
  border: 0;
  padding: 15px;
  margin-bottom: 30px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;

  &:disabled {
    background: #ffe2e0;
    cursor: normal;
  }
`;

const nickNameBtn = styled.button``;
