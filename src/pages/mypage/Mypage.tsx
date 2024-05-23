import React from "react";
import EditProfile from "./editpage/EditProfile";
import SongList from "./songlist/SongList";
import WeeklyReport from "./WeeklyReport";
import * as S from "./Styles/Mypage.style";

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
        <SongList />
      </S.Section>
    </S.PageContainer>
  );
}

export default Mypage;
