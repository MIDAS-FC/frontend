import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Styles/Member.style";
import api from "../../axiosInterceptor";

// axios.defaults.baseURL = "/auth";

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

const Join = () => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [randomNum, setRandomNum] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  // 이메일 인증번호 보내기
  const sendEmail = async () => {
    try {
      const response = await api.post("/email", {
        email,
        emailType: "sign-up",
        socialType: "SoundOfFlower",
        role: "USER",
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
      const response = await api.post("auth/register/authentication/number", {
        email,
        socialType: "SoundOfFlower",
        randomNum,
        inputNum: verificationCode,
        sendTime: new Date(),
        expireTime: new Date(new Date().getTime() + 30 * 1000), //인증번호 유효시간 30초
        emailType: "sign-up", // 또는 "reset-password" 등의 유효한 값
        role: "USER",
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
      await api.post("/resend-email", { email });
      alert("이메일을 재전송했습니다.");
    } catch (error) {
      console.error("이메일 재전송 오류:", error);
      alert("이메일을 재전송하는 동안 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복 여부 확인
  const verifyNickname = async () => {
    try {
      const response = await api.post("/register/authentication/nickname", {
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

  /// 회원가입
  const register = async () => {
    const formData = new FormData();
    formData.append("file", file || "");

    const signup = {
      email,
      nickName,
      password,
    };

    const userRequestDtoBlob = new Blob([JSON.stringify(signup)], {
      type: "application/json",
    });

    formData.append("signup", userRequestDtoBlob);

    try {
      const response = await api.post("/register", formData);

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
    <S.Container>
      <Stars />
      <S.JoinPage>
        <S.JoinForm>
          <S.JoinInput
            disabled={isSend}
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
          <S.FullWidthBtn type="button" onClick={sendEmail} disabled={isSend}>
            인증번호 전송
          </S.FullWidthBtn>
          <S.JoinInput
            disabled={isVerified}
            name="verificationCode"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            autoComplete="off"
          />
          <S.FullWidthBtn
            type="button"
            onClick={verifyEmail}
            disabled={isVerified}
          >
            인증하기
          </S.FullWidthBtn>
          <S.FullWidthBtn type="button" onClick={resendEmail}>
            이메일 재전송
          </S.FullWidthBtn>
          <S.JoinInput
            name="nickName"
            placeholder="nickname"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            autoComplete="off"
          />
          <S.FullWidthBtn type="button" onClick={verifyNickname}>
            중복 확인
          </S.FullWidthBtn>
          <S.JoinFunction onSubmit={handleSubmit}>
            {/* 자동 완성 기능 향상 및 보안 및 접근성 강화 */}
            <input
              type="text"
              name="username"
              value={email}
              autoComplete="username"
              style={{ display: "none" }}
              readOnly
            />
            <S.JoinInput
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <S.FileInput type="file" name="file" onChange={handleFileChange} />
            <S.FullWidthBtn type="submit">Sign up</S.FullWidthBtn>
          </S.JoinFunction>
        </S.JoinForm>
      </S.JoinPage>
    </S.Container>
  );
};

export default Join;
