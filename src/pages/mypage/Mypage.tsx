import React from "react";
import EditProfile from "./editpage/EditProfile";
import WeeklyReport from "./WeeklyReport";
import * as S from "./Styles/Mypage.style";
import LikeSongPage from "./songlist/LikeSongPage";
import TopSongPage from "./songlist/TopSongPage";

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
        <LikeSongPage />
      </S.Section>
      <S.Section>
        <TopSongPage />
      </S.Section>
    </S.PageContainer>
  );
}

export default Mypage;
