import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calender from "./Calender";
import * as S from "./Styles/DiaryCalender.style";

interface DiaryInfoResponse {
  flower: string;
  angry: number;
  sad: number;
  delight: number;
  calm: number;
  embarrassed: number;
  anxiety: number;
  musicId: number;
  title: string;
  singer: string;
  likes: number;
}

function DiaryCalender() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfoResponse[] | null>(null);
  const navigate = useNavigate();

  // 첫 렌더링 시 현재 날짜에 대한 일기 정보
  useEffect(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
    setSelectedDate(today.getDate());
  }, []);

  useEffect(() => {
    if (currentYear && currentMonth) {
      fetchDiaryInfo(currentYear, currentMonth);
    }
  }, [currentYear, currentMonth]);

  // 일기 가져오기
  const fetchDiaryInfo = async (year: number, month: number) => {
    try {
      const response = await axios.get("/diary/calendar", {
        params: { year, month },
      });
      setDiaryInfo(response.data);
    } catch (error) {
      console.error("Error fetching diary info:", error);
    }
  };
  console.log(diaryInfo);

  useEffect(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
  }, []);

  const handleDateSelect = (day: number, month: number, year: number) => {
    setSelectedDate(day);
    setCurrentMonth(month);
    setCurrentYear(year);
  };


  // 작성 버튼 클릭 시
  const handleCreateClick = () => {
    if (currentYear && currentMonth && selectedDate) {
      navigate(
        // create-diary: 임시 url
        `/WriteDiary?year=${currentYear}&month=${currentMonth}&day=${selectedDate}`
      );
    }
  };

  // 수정 버튼 클릭 시
  const handleEditClick = () => {
    if (currentYear && currentMonth && selectedDate) {
      navigate(
        // create-diary: 임시 url
        `/WriteDiary?year=${currentYear}&month=${currentMonth}&day=${selectedDate}`
      );
    }
  };

  return (
    <S.Container>
      <h2>
        {currentYear}년 {currentMonth}월
      </h2>
      <Calender onDateSelect={handleDateSelect} />
      <AnimatePresence>
        {selectedDate && (
          <S.BoxContainer>
            <S.Box
              key={selectedDate}
              variants={boxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <S.ImageContainer>
                <img src="/path/to/image.png" alt="Diary Entry" />
              </S.ImageContainer>
              {/* 날짜 {currentMonth}월 {selectedDate}일<div>제목</div>
              <div>내용</div> */}
              <S.InfoContainer>
                <S.InfoTitle>날짜</S.InfoTitle>
                <S.InfoText>
                  {currentMonth}월 {selectedDate}일
                </S.InfoText>
              </S.InfoContainer>
              <S.InfoContainer>
                <S.InfoTitle>제목</S.InfoTitle>
                <S.InfoText>제목 내용</S.InfoText>
              </S.InfoContainer>
              <S.InfoContainer>
                <S.InfoTitle>내용</S.InfoTitle>
                <S.InfoText>일기 내용</S.InfoText>
              </S.InfoContainer>
              <S.ButtonsContainer>
                <S.Button onClick={handleCreateClick}>작성</S.Button>
                <S.Button onClick={handleEditClick}>수정</S.Button>
              </S.ButtonsContainer>
            </S.Box>
          </S.BoxContainer>
        )}
      </AnimatePresence>
    </S.Container>
  );
}

export default DiaryCalender;

const boxVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};
