import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Calender from "./Calender";
import * as S from "./Styles/DiaryCalender.style";
import axios from "axios";
import api from "../../axiosInterceptor";

export const FaTimes = () => {
  return <FontAwesomeIcon icon={faTimes} />;
};

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

export const flowerImageMap: { [key: string]: string } = {
  장미: Rose,
  해바라기: Sunflower,
  튤립: Tulip,
  라일락: Lilac,
  "블루 데이지": BlueDaisy,
  캐모마일: Chamomile,
  달리아: Dahlia,
};

export const flowerDescriptionMap: { [key: string]: string } = {
  장미: "Rose: 분노를 상징합니다. 장미는 깊은 감정과 욕망을 상징하며, 열정적인 사랑이나 강렬한 분노와 연관되는 경우가 많습니다.",
  해바라기:
    "Sunflower: 기쁨을 상징합니다. 해바라기는 밝고 쾌활한 외모로 알려져 있으며, 행복과 긍정성을 상징하는 경우가 많습니다",
  튤립: "Tulip: 불안을 상징합니다. 라일락은 섬세한 외모와 강한 향기를 가지고 있어, 향수와 불안의 감정을 상징합니다",
  라일락:
    "Lilac: 우울을 상징합니다. 라일락은 섬세한 외모와 강한 향기로 알려져 있으며, 종종 우울과 향수의 감정을 불러일으킵니다.",
  "블루 데이지":
    "슬픔을 상징합니다. 블루 데이지는 독특하고 인상적인 외모로, 슬픔과 우울감을 상징하는 경우가 많습니다",
  캐모마일:
    "Chamomile: 중립을 상징합니다. 캐모마일 꽃은 진정한 특성으로 알려져 있어, 평화와 중립을 상징합니다.",
  달리아:
    "Dahlia: 사랑을 상징합니다. 달리아는 생동감 있고 다양한 모습으로, 영원한 유대와 깊은 사랑을 상징합니다.",
};

function DiaryCalender() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [monthInfo, setMonthInfo] = useState<DiaryInfoResponse[] | null>(null);
  const [dayInfo, setDayInfo] = useState<DiaryInfoResponse | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
    setSelectedDate(today.getDate());
  }, []);

  useEffect(() => {
    if (currentYear && currentMonth) {
      fetchMonthCalendar(currentYear, currentMonth);
    }
  }, [currentYear, currentMonth]);

  useEffect(() => {
    if (currentYear && currentMonth && selectedDate) {
      fetchDayCalendar(currentYear, currentMonth, selectedDate);
    }
  }, [selectedDate]);

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

  const fetchDayCalendar = async (year: number, month: number, day: number) => {
    try {
      const response = await api.get("/diary/calendar/day", {
        params: { year, month, day },
      });
      setDayInfo(response.data);

      // 년, 월, 일 정보를 로컬 스토리지에 저장
      localStorage.setItem("calendarYear", year.toString());
      localStorage.setItem("calendarMonth", month.toString());
      localStorage.setItem("calendarDay", day.toString());
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
    setIsExpanded(true);
  };

  const handleCreateClick = () => {
    if (currentYear && currentMonth && selectedDate) {
      navigate(
        `/WriteDiary?year=${currentYear}&month=${currentMonth}&day=${selectedDate}`
      );
    }
  };

  const handleEditClick = () => {
    if (dayInfo && currentYear && currentMonth && selectedDate) {
      navigate(
        `/DiaryModify?year=${currentYear}&month=${currentMonth}&day=${selectedDate}`
      );
    }
  };

  const decodeText = (text: string) => {
    return decodeURIComponent(text).replace(/\+/g, " ");
  };

  return (
    <S.Container>
      <S.Title>
        {currentYear}년 {currentMonth}월
      </S.Title>
      <Calender onDateSelect={handleDateSelect} monthInfo={monthInfo} />
      {selectedDate && (
        <S.BoxContainer>
          <S.Box
            key={selectedDate}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <S.CloseButton
              onClick={() => setSelectedDate(null)}
              initial={{ x: 20, y: -20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FaTimes />
            </S.CloseButton>
            {dayInfo && flowerImageMap[dayInfo.flower] && (
              <S.FlowerImageContainer
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <S.Flower
                  src={flowerImageMap[dayInfo.flower]}
                  alt={dayInfo.flower}
                />
                <AnimatePresence>
                  {isHovered && (
                    <S.PopupBox
                      variants={popupVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {flowerDescriptionMap[dayInfo.flower]}
                    </S.PopupBox>
                  )}
                </AnimatePresence>
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
              <S.InfoText>
                {dayInfo?.title && decodeText(dayInfo.title)}
              </S.InfoText>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.InfoTitle>내용</S.InfoTitle>
              <S.InfoText>
                {dayInfo?.comment && decodeText(dayInfo.comment)}
              </S.InfoText>
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
    </S.Container>
  );
}

export default DiaryCalender;

const boxVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

const popupVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};
