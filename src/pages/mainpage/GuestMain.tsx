import React from "react";
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
  return (
    <S.Container>
      <Stars />
      <S.Content>
        <S.Logo>소리꽃</S.Logo>
        <S.StartButton>시작하기</S.StartButton>
      </S.Content>
    </S.Container>
  );
};

export default GuestMain;
