import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Styles/GuestMain.style";

const Stars = () => {
  return (
    <>
      {Array.from({ length: 50 }).map((_, index) => (
        <S.Star key={index} />
      ))}
    </>
  );
};

const GuestMain = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <S.Container>
      <Stars />
      <S.Content>
        <S.Bigtext>당신의 감정 여정을 함께하는 공간,</S.Bigtext>
        <S.Bigtext>여기서 매일의 감정을 기록해 보세요</S.Bigtext>
        <S.ButtonContainer>
          <S.Smalltext>지금 바로 시작하기</S.Smalltext>
          <S.StartButton onClick={handleStartClick}>시작하기</S.StartButton>
        </S.ButtonContainer>
      </S.Content>
    </S.Container>
  );
};

export default GuestMain;
