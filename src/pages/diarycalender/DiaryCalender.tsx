import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import api from "../../axiosInterceptor";
import Calender from "./Calender";
import * as S from "./Styles/DiaryCalender.style";
import EmptyDiary from "../../assets/images/EmptyDiary.webp";
import Rose from "../../assets/icons/flowers/Rose.webp";
import Sunflower from "../../assets/icons/flowers/Sunflower.webp";
import Tulip from "../../assets/icons/flowers/Tulip.webp";
import Lilac from "../../assets/icons/flowers/Lilac.webp";
import BlueDaisy from "../../assets/icons/flowers/BlueDaisy.webp";
import Chamomile from "../../assets/icons/flowers/Chamomile.webp";
import Dahlia from "../../assets/icons/flowers/Dahlia.webp";

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
      // const response = await api.get("/diary/calendar/month", {
      //   params: { year, month },
      // });
      // setMonthInfo(response.data);

      setMonthInfo(dummy);
    } catch (error: any) {
      if (error.response.data.code === "SAG1") {
        alert("외부 API와 통신이 불가능합니다.");
      } else {
        console.log("Failure Fetching month Calender", error);
        alert("일기 정보를 가져오는 데 실패했습니다.");
      }
    }
  };

  // 달력 day 정보 가져오기
  const fetchDayCalendar = async (year: number, month: number, day: number) => {
    try {
      const response = await api.get("/diary/calendar/day", {
        params: { year, month, day },
      });
      const data = response.data;
      setDayInfo(data);
    } catch (error: any) {
      if (error.response.data.code === "SAG1") {
        alert("외부 API와 통신이 불가능합니다.");
      } else if (error.response?.data?.code === "SAD1") {
        alert("일기를 찾을 수 없습니다.");
      } else {
        console.log("Failure Fetching day Calender", error);
        alert("일기 정보를 가져오는 데 실패했습니다.");
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

const dummy = [
  {
    diaryId: 5,
    date: "2024-06-01",
    flower: "캐모마일",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "2",
    isLike: false,
    angry: 0.2,
    sad: 0.2,
    delight: 0.2,
    calm: 0.2,
    depressed: 0.0,
    anxiety: 0.2,
    love: 0.2,
  },
  {
    diaryId: 7,
    date: "2024-06-05",
    flower: "라일락",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "1",
    isLike: false,
    angry: 0.2,
    sad: 0.2,
    delight: 0.2,
    calm: 0.2,
    depressed: 0.0,
    anxiety: 0.2,
    love: 0.2,
  },
  {
    diaryId: 9,
    date: "2024-06-08",
    flower: "블루 데이지",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "1",
    isLike: false,
    angry: 0.2,
    sad: 0.2,
    delight: 0.2,
    calm: 0.2,
    depressed: 0.0,
    anxiety: 0.2,
    love: 0.2,
  },
  {
    diaryId: 17,
    date: "2024-06-15",
    flower: "달리아",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "2",
    isLike: true,
    angry: 0.2,
    sad: 0.2,
    delight: 0.2,
    calm: 0.2,
    depressed: 0.0,
    anxiety: 0.2,
    love: 0.9,
  },
  {
    diaryId: 21,
    date: "2024-06-16",
    flower: "튤립",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "7",
    isLike: true,
    angry: 0.1,
    sad: 0.1,
    delight: 0.1,
    calm: 0.1,
    depressed: 0.0,
    anxiety: 0.1,
    love: 0.9,
  },
  {
    diaryId: 26,
    date: "2024-06-20",
    flower: "장미",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "2",
    isLike: false,
    angry: 0.5,
    sad: 0.5,
    delight: 0.5,
    calm: 0.5,
    depressed: 0.0,
    anxiety: 0.5,
    love: 0.5,
  },
  {
    diaryId: 30,
    date: "2024-06-30",
    flower: "해바라기",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "9",
    isLike: false,
    angry: 0.1,
    sad: 0.2,
    delight: 0.95,
    calm: 0.5,
    depressed: 0.0,
    anxiety: 0.1,
    love: 0.4,
  },
];
