import React from "react";
import EditProfile from "./editpage/EditProfile";
import WeeklyReport from "./WeeklyReport";
import * as S from "./Styles/Mypage.style";
import SongPage from "./songlist/SongPage";

function Mypage() {
  return (
    <S.PageContainer>
      <S.Section>
        <EditProfile />
      </S.Section>
      <S.Section>
        <WeeklyReport />
      </S.Section>
      <S.Section>
        <SongPage />
      </S.Section>
    </S.PageContainer>
  );
}

export default Mypage;
