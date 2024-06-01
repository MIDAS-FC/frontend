import React from "react";
import EditProfile from "./editpage/EditProfile";
import WeeklyReport from "./WeeklyReport";
import * as S from "./Styles/Mypage.style";
import LikedSongs from "./songlist/LikedSongs";
import TopSongs from "./songlist/TopSongs";

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
        <LikedSongs />
      </S.Section>
      <S.Section>
        <TopSongs />
      </S.Section>
    </S.PageContainer>
  );
}

export default Mypage;
