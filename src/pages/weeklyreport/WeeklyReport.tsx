import { useState } from "react";
import Calender from "./Calender";
import * as S from "./Styles/WeeklyReport.style";
import Graph from "./Graph";

function WeeklyReport() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear()
  );

  const handleDateSelect = (day: number, month: number) => {
    setSelectedDate(day);
  };

  const goToPreviousWeek = () => {
    const previousWeekDate = new Date(currentDate);
    previousWeekDate.setDate(previousWeekDate.getDate() - 7);
    setCurrentDate(previousWeekDate);
    setCurrentMonth(previousWeekDate.getMonth() + 1);
    setCurrentYear(previousWeekDate.getFullYear());
  };

  const goToNextWeek = () => {
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    setCurrentDate(nextWeekDate);
    setCurrentMonth(nextWeekDate.getMonth() + 1);
    setCurrentYear(nextWeekDate.getFullYear());
  };

  return (
    <S.Container>
      <S.Header>
        <button onClick={goToPreviousWeek}>◀</button>
        <h2>
          {currentYear}년 {currentMonth}월
        </h2>
        <button onClick={goToNextWeek}>▶</button>
      </S.Header>
      <Calender onDateSelect={handleDateSelect} currentDate={currentDate} />
      <Graph />
      <S.ReportBox>
        <S.List>
          <S.ListItem>
            기쁨: 이번 주에 기쁨 점정은 전주 대비 20% 상승하였습니다.
          </S.ListItem>
          <S.ListItem>분노: 분노의 수치는 15% 감소하였습니다.</S.ListItem>
          <S.ListItem>당황: 당황의 수치는 변동이 없습니다.</S.ListItem>
          <S.ListItem>불안: 불안은 25% 증가하였습니다.</S.ListItem>
          <S.ListItem>슬픔: 슬픔의 수치는 40% 증가하였습니다.</S.ListItem>
        </S.List>
        <S.Text>
          이번 주는 슬픔 감정의 수치가 평균적으로 40% 증가하였습니다. 이는 주
          중반에 경험한 개인적인 도전과 관련이 있을 수 있습니다. 이러한 점검을
          바탕으로, 앞으로는 스트레스를 완화할 수 있는 활동을 더 많이
          포함시키고, 감정을 조절하는 기술을 개발하는 것이 필요합니다.
        </S.Text>
      </S.ReportBox>
    </S.Container>
  );
}

export default WeeklyReport;
