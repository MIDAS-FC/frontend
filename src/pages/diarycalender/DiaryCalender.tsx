import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calender from "./Calender";
import * as S from "./Styles/DiaryCalender.style";
import api from "./api";
import axios from "axios";

interface DiaryInfoResponse {
  diaryId: number;
  flower: string;
  imgUrl: string[];
  angry: number;
  sad: number;
  delight: number;
  calm: number;
  embarrased: number;
  anxiety: number;
  love: number;
  spotify: string;
  isLike: boolean;
}

function DiaryCalender() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfoResponse[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
    } else {
      console.log("token error");
    }
  }, []);

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

  const fetchDiaryInfo = async (year: number, month: number) => {
    try {
      const response = await api.get("/diary/calendar/month", {
        params: { year, month },
      });

      console.log("response: ", response.data);
      setDiaryInfo(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "일기 정보를 가져오는 중 오류 발생: Network Error",
          error.message
        );
        console.error("오류 세부 사항:", error.config);
        if (error.response) {
          console.error("오류 응답:", error.response.data);
        }
      } else {
        console.error("Error: ", error);
      }
    }
  };

  const handleDateSelect = (day: number, month: number, year: number) => {
    setSelectedDate(day);
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const handleCreateClick = () => {
    if (currentYear && currentMonth && selectedDate) {
      navigate(
        `/WriteDiary?year=${currentYear}&month=${currentMonth}&day=${selectedDate}`
      );
    }
  };

  const handleEditClick = () => {
    if (currentYear && currentMonth && selectedDate) {
      navigate(
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
                <img src="/mnt/data/image.png" alt="Diary Entry" />
              </S.ImageContainer>
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
