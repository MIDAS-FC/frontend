import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import api from "../../axiosInterceptor";
import Calender from "./Calender";
import * as S from "./Styles/DiaryCalender.style";
import findDayHighestEmotion from "./components/findDayHighestEmotion";
import EmptyDiary from "../../assets/images/EmptyDiary.webp";

interface DiaryInfoResponse {
  diaryId: number;
  title: string;
  comment: string;
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
  const [monthInfo, setMonthInfo] = useState<DiaryInfoResponse[] | null>(null);
  const [dayInfo, setDayInfo] = useState<DiaryInfoResponse | null>(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
      console.log(token);
    } else {
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
    setSelectedDate(today.getDate());
  }, []);

  // 달력 month 정보 가져오기
  useEffect(() => {
    if (currentYear && currentMonth) {
      fetchMonthCalendar(currentYear, currentMonth);
    }
  }, [currentYear, currentMonth]);

  // 달력 day 정보 가져오기
  useEffect(() => {
    if (currentYear && currentMonth && selectedDate) {
      fetchDayCalendar(currentYear, currentMonth, selectedDate);
    }
  }, [selectedDate]);

  // 달력 month 정보 가져오기
  const fetchMonthCalendar = async (year: number, month: number) => {
    try {
      const response = await api.get("/diary/calendar/month", {
        params: { year, month },
      });

      console.log("Month response 가져오기:", {
        year,
        month,
        response: [response.data],
      });

      setMonthInfo(response.data);
      const highestEmotionsData = findDayHighestEmotion(response.data);
      console.log("highestEmotion", highestEmotionsData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "일기 정보(month)를 가져오는 중 오류 발생: Network Error",
          error.message
        );
        console.error("오류 세부 사항(month):", error.config);
        if (error.response) {
          console.error("오류 응답(month):", error.response.data);
        }
      } else {
        console.error("Error(month): ", error);
      }
    }
  };

  // 달력 day 정보 가져오기
  const fetchDayCalendar = async (year: number, month: number, day: number) => {
    try {
      const response = await api.get("/diary/calendar/day", {
        params: { year, month, day },
      });

      console.log("Day response 가져오기:", {
        year,
        month,
        day,
        response: [response.data],
      });
      setDayInfo(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "일기 정보(Day)를 가져오는 중 오류 발생: Network Error",
          error.message
        );
        console.error("오류 세부 사항(Day):", error.config);
        if (error.response) {
          console.error("오류 응답(Day):", error.response.data);
        }
      } else {
        console.error("Error(Day): ", error);
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
        {/* 해당 날짜에 일기가 없으면 팝업 창 안 보여줌 */}
        {/* {selectedDate && dayInfo && dayInfo.length > 0 && ( */}
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
                {dayInfo?.imgUrl && dayInfo.imgUrl.length > 0 ? (
                  dayInfo.imgUrl
                    .slice(0, 3)
                    .map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Diary Image ${index + 1}`}
                      />
                    ))
                ) : (
                  <img src={EmptyDiary} alt="Empty Diary" />
                )}
              </S.ImageContainer>
              <S.InfoContainer>
                <S.InfoTitle>날짜</S.InfoTitle>
                <S.InfoText>
                  {currentMonth}월 {selectedDate}일
                </S.InfoText>
              </S.InfoContainer>
              <S.InfoContainer>
                <S.InfoTitle>제목</S.InfoTitle>
                <S.InfoText>{dayInfo?.title}</S.InfoText>
              </S.InfoContainer>
              <S.InfoContainer>
                <S.InfoTitle>내용</S.InfoTitle>
                <S.InfoText>{dayInfo?.comment}</S.InfoText>
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
