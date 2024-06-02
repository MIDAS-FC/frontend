import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import api from "../../axiosInterceptor";
import Calender from "./Calender";
import * as S from "./Styles/DiaryCalender.style";
import findDayHighestEmotion, {
  HighestEmotionData,
} from "./components/findDayHighestEmotion";
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
  depressed: number;
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
  const [highestEmotion, setHighestEmotion] = useState<
    HighestEmotionData[] | null
  >([]);
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
      // selectedDate 묶어서 새로운 객체 만들기
      // const response = await api.get("/diary/calendar/month", {
      //   params: { year, month },
      // });
      // setMonthInfo(response.data);
      // setHighestEmotion(findDayHighestEmotion(monthInfo));

      console.log("선택한 날짜", selectedDate);
      const data = dummy.map((entry) => ({
        ...entry,
        selectedDate,
      }));
      console.log("data묶은객체:", data);
      setMonthInfo(data);

      if (data) {
        setHighestEmotion(findDayHighestEmotion(data));
      }

      // console.log("highestEmotion", highestEmotion);
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
      <Calender
        onDateSelect={handleDateSelect}
        highestEmotion={highestEmotion}
      />
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

const dummy = [
  {
    diaryId: 1,
    flower: "rose",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "9",
    isLike: false,
    angry: 0.7681603635448984,
    sad: 0.2071811340316438,
    delight: 0.9515139979628147,
    calm: 0.5218110755117812,
    depressed: 0.0, // 추가된 속성
    embarrased: 0.5596389063881951,
    anxiety: 0.190229845947552,
    love: 0.423595274433231,
  },
  {
    diaryId: 7,
    flower: "rose",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "2",
    isLike: false,
    angry: 0.954506169757447,
    sad: 0.8394206242089939,
    delight: 0.6648270359075344,
    calm: 0.2454163114386936,
    embarrased: 0.1351945809119124,
    anxiety: 0.8748064821686747,
    depressed: 0.0, // 추가된 속성
    love: 0.8543248604240017,
  },
  {
    diaryId: 7,
    flower: "rose",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "7",
    isLike: true,
    angry: 0.367489989792214,
    sad: 0.5691485711152104,
    delight: 0.839332299997306,
    calm: 0.585309869117859,
    embarrased: 0.7814061333923933,
    anxiety: 0.2317584342182878,
    depressed: 0.0, // 추가된 속성
    love: 0.0939879841382664,
  },
  {
    diaryId: 9,
    flower: "rose",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "1",
    isLike: false,
    angry: 0.0726065299224864,
    sad: 0.8803728626108344,
    delight: 0.0185460640985377,
    calm: 0.3363917015162449,
    depressed: 0.0, // 추가된 속성
    embarrased: 0.1662059772341291,
    anxiety: 0.4014247583489474,
    love: 0.6460031501068441,
  },
  {
    diaryId: 9,
    flower: "rose",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "1",
    isLike: false,
    angry: 0.1273708939552307,
    sad: 0.14862558245658875,
    delight: 0.13125406205654144,
    depressed: 0.0, // 추가된 속성
    calm: 0.10655736178159714,
    embarrased: 0.21094532310962677,
    anxiety: 0.18677383661270142,
    love: 0.08847281336784363,
  },
  {
    diaryId: 10,
    flower: "rose",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "2",
    isLike: true,
    angry: 0.8123708939552307,
    sad: 0.7486255824565887,
    delight: 0.6312540620565414,
    depressed: 0.0, // 추가된 속성
    calm: 0.8065573617815971,
    embarrased: 0.3109453231096268,
    anxiety: 0.2867738366127014,
    love: 0.1884728133678436,
  },
  {
    diaryId: 11,
    flower: "rose",
    title: "안녕하세요",
    comment:
      "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
    imgUrl: [
      "https://midas-chatly.s3.ap-northeast-2.amazonaws.com/encoded_image_url",
    ],
    spotify: "2",
    isLike: false,
    angry: 0.8464207408258582,
    sad: 0.1486255824565888,
    delight: 0.1312540620565414,
    depressed: 0.0, // 추가된 속성
    calm: 0.1065573617815971,
    embarrased: 0.2109453231096268,
    anxiety: 0.1867738366127014,
    love: 0.0884728133678436,
  },
];
