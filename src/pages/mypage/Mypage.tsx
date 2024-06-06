import { useEffect, useRef, useState } from "react";
import * as S from "./Styles/Mypage.style";
import WeeklyReport from "./WeeklyReport";
import EditProfile from "./editpage/EditProfile";
import LikeSongPage from "./songlist/LikeSongPage";
import TopSongPage from "./songlist/TopSongPage";

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

function Mypage() {
  const [likeStatusChanged, setLikeStatusChanged] = useState(false);
  const topSongPageRef = useRef<{ fetchTopSongs: () => void }>(null);

  const handleLikeStatusChange = () => {
    setLikeStatusChanged((prev) => !prev); // 상태를 토글
    if (topSongPageRef.current) {
      topSongPageRef.current.fetchTopSongs();
    }
  };

  return (
    <S.PageContainer>
      <Stars />
      <S.Section>
        <EditProfile />
      </S.Section>
      <S.Section>
        <WeeklyReport />
      </S.Section>
      <S.Section>
        <LikeSongPage onLikeStatusChange={handleLikeStatusChange} />
      </S.Section>
      <S.Section>
        <TopSongPage
          ref={topSongPageRef}
          likeStatusChanged={likeStatusChanged}
        />
      </S.Section>
    </S.PageContainer>
  );
}

export default Mypage;
