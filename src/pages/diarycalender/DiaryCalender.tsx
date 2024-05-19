import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Calender from "./Calender";
import * as S from "./Styles/DiaryCalender.style";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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

  useEffect(() => {
    if (currentYear && currentMonth) {
      fetchDiaryInfo(currentYear, currentMonth);
    }
  }, [currentYear, currentMonth]);

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

  return (
    <S.Container>
      <h2>
        {currentYear}년{currentMonth}월
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
              날짜 {currentMonth}월 {selectedDate}일<div>제목</div>
              <div>내용</div>
              <S.ButtonsContainer>
                <S.Button>작성</S.Button>
                <S.Button>수정</S.Button>
                <S.Button>삭제</S.Button>
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
