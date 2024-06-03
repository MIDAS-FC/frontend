import { useState } from "react";
import Calender from "./Calender";
import Graph from "./Graph";
import * as S from "./Styles/WeeklyReport.style";

export const ComparePercentage = (current: any, previous: any) => {
  const changes: any = {};
  for (const emotion in current) {
    const currentVal = current[emotion] || 0;
    const previousVal = previous[emotion] || 0;
    if (previousVal === 0) {
      changes[emotion] = currentVal === 0 ? 0 : 100;
    } else {
      changes[emotion] = ((currentVal - previousVal) / previousVal) * 100;
    }
  }
  return changes;
};

export const findHighestPercentage = (current: any) => {
  let highestEmotion = "";
  let highestValue = -Infinity;

  for (const emotion in current) {
    const currentVal = current[emotion] || 0;
    if (currentVal > highestValue) {
      highestValue = currentVal;
      highestEmotion = emotion;
    }
  }
  return highestEmotion;
};

const getAdvice = (emotion: string) => {
  switch (emotion) {
    case "angry":
      return '"마음을 진정시키기 위해 깊은 호흡을 해보세요. 화가 나는 상황을 피하는 것도 도움이 될 수 있습니다. 신체 활동이나 운동을 통해 스트레스를 해소해보세요."';
    case "sad":
      return `"슬픔을 나눌 수 있는 친구나 가족과 대화를 나눠보세요. 감정을 표현하는 것이 중요합니다. 따뜻한 음료를 마시며 자신을 위로해보세요."`;
    case "delight":
      return `"현재의 행복한 순간을 충분히 즐기세요. 이 순간을 일기나 사진으로 기록해보는 것도 좋습니다. 작은 감사의 마음을 표현하며 주변 사람들과 공유해보세요."`;
    case "calm":
      return `"현재의 평온한 상태를 유지하기 위해 규칙적인 루틴을 따르세요. 명상이나 요가도 도움이 될 수 있습니다. 자연 속에서 산책을 하며 마음을 정화해보세요."`;
    case "depressed":
      return `"전문가의 도움을 받는 것을 주저하지 마세요. 충분한 수면과 건강한 식습관을 유지하세요. 긍정적인 생각을 위해 작은 목표를 설정해보세요."`;
    case "anxiety":
      return `"긴장을 풀기 위해 깊게 숨을 들이마시고 천천히 내쉬세요. 규칙적인 운동도 불안 완화에 도움이 됩니다. 명상이나 호흡 운동을 통해 마음을 안정시켜보세요."`;
    case "love":
      return `"사랑하는 사람과의 시간을 소중히 여기고, 그들에게 감사를 표현하세요. 작은 선물이나 편지로 마음을 전해보세요. 함께하는 활동을 계획해보세요."`;
    default:
      return "";
  }
};

function WeeklyReport() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear()
  );

  // const handleDateSelect = (day: number, month: number) => {
  //   setSelectedDate(day);
  // };

  // const goToPreviousWeek = () => {
  //   const previousWeekDate = new Date(currentDate);
  //   previousWeekDate.setDate(previousWeekDate.getDate() - 7);
  //   setCurrentDate(previousWeekDate);
  //   setCurrentMonth(previousWeekDate.getMonth() + 1);
  //   setCurrentYear(previousWeekDate.getFullYear());
  // };

  // const goToNextWeek = () => {
  //   const nextWeekDate = new Date(currentDate);
  //   nextWeekDate.setDate(nextWeekDate.getDate() + 7);
  //   setCurrentDate(nextWeekDate);
  //   setCurrentMonth(nextWeekDate.getMonth() + 1);
  //   setCurrentYear(nextWeekDate.getFullYear());
  // };

  // 시작 날짜(일요일)와 끝 날짜(토요일) 계산
  const currentDay = currentDate.getDay();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDay);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth() + 1;
  const startDay = startDate.getDate();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();

  const [currentPercentages, setCurrentPercentages] = useState<any>({});
  const [previousPercentages, setPreviousPercentages] = useState<any>({});

  // 이전 주 날짜 계산
  const startPreviousWeekDate = new Date(startDate);
  startPreviousWeekDate.setDate(startDate.getDate() - 7);
  const Previous_startYear = startPreviousWeekDate.getFullYear();
  const Previous_startMonth = startPreviousWeekDate.getMonth() + 1;
  const Previous_startDay = startPreviousWeekDate.getDate();

  const endPreviousWeekDate = new Date(endDate);
  endPreviousWeekDate.setDate(endDate.getDate() - 7);
  const Previous_endYear = endPreviousWeekDate.getFullYear();
  const Previous_endMonth = endPreviousWeekDate.getMonth() + 1;
  const Previous_endDay = endPreviousWeekDate.getDate();

  const percentageChanges = ComparePercentage(
    currentPercentages,
    previousPercentages
  );

  const highestEmotion = findHighestPercentage(currentPercentages);
  const advice = getAdvice(highestEmotion);

  return (
    <S.Container>
      <h1>주간 감정 요약을 통해 자신을 더 깊이 이해하세요</h1>
      <p>
        주간 감정 레포트를 통해 지난 일주일 동안의 감정 변화를 한눈에
        확인하세요. 각 날짜별 감정 수치를 그래프로 시각화하고, 이전 주와
        비교하여 감정의 변화를 분석해드립니다. 감정 변화에 대한 조언을 통해 더
        나은 마음 관리 방법을 알아보세요.
      </p>
      <S.Header>
        {/* <button onClick={goToPreviousWeek}>◀</button> */}
        <h2>
          {currentYear}년 {currentMonth}월
        </h2>
        {/* <button onClick={goToNextWeek}>▶</button> */}
      </S.Header>
      {/* <Calender onDateSelect={handleDateSelect} currentDate={currentDate} /> */}
      <Calender currentDate={currentDate} />
      <p>
        아래의 그래프는 각자의 감정이 일주일 동안 어떻게 변해왔는지 보여줍니다.
        다양한 색상은 각각 다른 감정을 나타내며, 여덟의 높이는 감정의 수치를
        표현합니다.
      </p>
      <S.GraphContainer>
        <Graph
          startYear={startYear}
          startMonth={startMonth}
          startDay={startDay}
          endYear={endYear}
          endMonth={endMonth}
          endDay={endDay}
          Previous_startYear={Previous_startYear}
          Previous_startMonth={Previous_startMonth}
          Previous_startDay={Previous_startDay}
          Previous_endYear={Previous_endYear}
          Previous_endMonth={Previous_endMonth}
          Previous_endDay={Previous_endDay}
          setCurrentPercentages={setCurrentPercentages}
          setPreviousPercentages={setPreviousPercentages}
        />
      </S.GraphContainer>
      <S.ReportBox>
        <h3>이번 주 감정 분석 리포트</h3>
        {Object.keys(percentageChanges).map((emotion) => {
          const emotionText =
            emotion === "delight"
              ? "Delight"
              : emotion === "angry"
              ? "Angry"
              : emotion === "sad"
              ? "Sad"
              : emotion === "anxiety"
              ? "Anxiety"
              : emotion === "anxiety"
              ? "Anxiety"
              : emotion === "calm"
              ? "Calm"
              : emotion === "love"
              ? "Love"
              : emotion;

          const emotionKorean =
            emotion === "delight"
              ? "행복"
              : emotion === "angry"
              ? "분노"
              : emotion === "sad"
              ? "슬픔"
              : emotion === "depressed"
              ? "우울"
              : emotion === "anxiety"
              ? "불안"
              : emotion === "calm"
              ? "중립"
              : emotion === "love"
              ? "사랑"
              : emotion;

          const percentageChange = percentageChanges[emotion];
          const changeText =
            percentageChange > 0 ? `증가했습니다.` : `감소했습니다.`;

          return (
            <S.List key={emotion}>
              {emotionText}: 이번 주 {emotionKorean}의 수치는 전주 대비{" "}
              {Math.abs(percentageChange).toFixed(2)} % {changeText}
            </S.List>
          );
        })}
        <S.Text>{advice}</S.Text>
      </S.ReportBox>
    </S.Container>
  );
}

export default WeeklyReport;
