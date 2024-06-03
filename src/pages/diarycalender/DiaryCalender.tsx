import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import BlueDaisy from "../../assets/icons/flowers/BlueDaisy.webp";
import Chamomile from "../../assets/icons/flowers/Chamomile.webp";
import Dahlia from "../../assets/icons/flowers/Dahlia.webp";
import Lilac from "../../assets/icons/flowers/Lilac.webp";
import Rose from "../../assets/icons/flowers/Rose.webp";
import Sunflower from "../../assets/icons/flowers/Sunflower.webp";
import Tulip from "../../assets/icons/flowers/Tulip.webp";
import EmptyDiary from "../../assets/images/EmptyDiary.webp";
import api from "../../axiosInterceptor";
import Calender from "./Calender";
import * as S from "./Styles/DiaryCalender.style";

export interface DiaryInfoResponse {
  diaryId: number;
  date: string;
  title: string;
  comment: string;
  flower: string;
  imgUrl: string[];
  angry: number;
  sad: number;
  delight: number;
  calm: number;
  depressed: number;
  anxiety: number;
  love: number;
  spotify: string;
  isLike: boolean;
}

const flowerImageMap: { [key: string]: string } = {
  장미: Rose,
  해바라기: Sunflower,
  튤립: Tulip,
  라일락: Lilac,
  "블루 데이지": BlueDaisy,
  캐모마일: Chamomile,
  달리아: Dahlia,
};

function DiaryCalender() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [monthInfo, setMonthInfo] = useState<DiaryInfoResponse[] | null>(null);
  const [dayInfo, setDayInfo] = useState<DiaryInfoResponse | null>(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
  //     // console.log(token);
  //   } else {
  //   }
  // }, []);

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
      setMonthInfo(response.data);
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response.data.code === "SAG1") {
          console.log("외부 API와 통신이 불가능합니다.");
        } else {
          console.log("일기 정보를 가져오는 데 실패했습니다.");
        }
      } else {
        console.log("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 달력 day 정보 가져오기
  const fetchDayCalendar = async (year: number, month: number, day: number) => {
    try {
      const response = await api.get("/diary/calendar/day", {
        params: { year, month, day },
      });
      setDayInfo(response.data);
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response.data.code === "SAG1") {
          console.log("외부 API와 통신이 불가능합니다.");
        } else if (error.response.data.code === "SAD1") {
          console.log("일기를 찾을 수 없습니다.");
        } else {
          console.log("일기 정보를 가져오는 데 실패했습니다.");
        }
      } else {
        console.log("알 수 없는 오류가 발생했습니다.");
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
      <Calender onDateSelect={handleDateSelect} monthInfo={monthInfo} />
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
              {dayInfo && flowerImageMap[dayInfo.flower] && (
                <S.FlowerImageContainer>
                  <S.Flower
                    src={flowerImageMap[dayInfo.flower]}
                    alt={dayInfo.flower}
                  />
                </S.FlowerImageContainer>
              )}
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
                {dayInfo ? (
                  <S.Button onClick={handleEditClick}>수정</S.Button>
                ) : (
                  <S.Button onClick={handleCreateClick}>작성</S.Button>
                )}
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
