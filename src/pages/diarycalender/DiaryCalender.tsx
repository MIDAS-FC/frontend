import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calender from "./Calender";
import SongList from "./SongList";
import * as S from "./Styles/DiaryCalender.style";

function DiaryCalender() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const navigate = useNavigate();


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

  const handleWriteButtonClick = () => {
    if (selectedDate && currentMonth && currentYear) {
      navigate("/WriteDiary", { state: { day: selectedDate, month: currentMonth, year: currentYear } });
    } else {
      alert("날짜를 선택해주세요!");
    }
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
                <S.Button onClick={handleWriteButtonClick}>작성</S.Button>
                <S.Button>수정</S.Button>
                <S.Button>삭제</S.Button>
              </S.ButtonsContainer>
            </S.Box>
          </S.BoxContainer>
        )}
      </AnimatePresence>
      <S.BoxContainer>
        <SongList />
      </S.BoxContainer>
    </S.Container>
  );
}

export default DiaryCalender;

const boxVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};
