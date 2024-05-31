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

  console.log([
    "startYear:",
    startYear,
    "startMonth:",
    startMonth,
    "startDay:",
    startDay,
    "endMonth:",
    endMonth,
    "endDay:",
    endDay,
  ]);

  // // 조언
  // const getAdviceText = (emotion: keyof EmotionData, value: number) => {
  //   switch (emotion) {
  //     case "delight":
  //       return `이번 주는 기쁨의 수치가 평균적으로 ${value}% 증가하였습니다. 이는 긍정적인 경험과 성취가 많았음을 나타냅니다. 이러한 기쁨을 유지하기 위해 감사의 마음을 표현하고, 소중한 사람들과 시간을 보내며, 좋아하는 활동에 참여하는 것이 좋습니다.`;
  //     case "angry":
  //       return `이번 주는 분노의 수치가 평균적으로 ${value}% 증가하였습니다. 이는 스트레스와 갈등 상황이 많았음을 시사합니다. 분노를 효과적으로 관리하기 위해 깊은 호흡, 명상, 운동 등의 스트레스 해소 방법을 활용하고, 필요시 전문가의 도움을 받는 것도 좋습니다.`;
  //     case "sad":
  //       return `이번 주는 슬픔의 수치가 평균적으로 ${value}% 증가하였습니다. 이는 주 중반에 경험한 개인적인 도전과 관련이 있을 수 있습니다. 이러한 점검을 바탕으로, 앞으로는 스트레스를 완화할 수 있는 활동을 더 많이 포함시키고, 감정을 조절하는 기술을 개발하는 것이 필요합니다.`;
  //     case "calm":
  //       return `이번 주는 차분함의 수치가 평균적으로 ${value}% 증가하였습니다. 이는 마음의 안정과 평온함을 잘 유지하였음을 나타냅니다. 이러한 차분함을 지속하기 위해 일상에서 휴식 시간을 가지며, 자연 속에서 시간을 보내는 것도 좋은 방법입니다.`;
  //     case "embarrased":
  //       return `이번 주는 당황의 수치가 평균적으로 ${value}% 증가하였습니다. 이는 예상치 못한 상황들이 많았음을 의미할 수 있습니다. 당황스러운 상황을 잘 대처하기 위해 미리 준비하고, 긍정적인 마음가짐을 가지는 것이 중요합니다.`;
  //     case "anxiety":
  //       return `이번 주는 불안의 수치가 평균적으로 ${value}% 증가하였습니다. 이는 불확실한 상황과 걱정이 많았음을 시사합니다. 불안을 줄이기 위해 명상, 운동, 취미 생활 등을 통해 마음을 안정시키고, 긍정적인 생각을 유지하는 것이 필요합니다.`;
  //     case "love":
  //       return `이번 주는 사랑의 수치가 평균적으로 ${value}% 증가하였습니다. 이는 관계에서 많은 사랑과 지원을 받았음을 나타냅니다. 이러한 사랑을 유지하고 강화하기 위해 소중한 사람들과의 시간을 더 많이 보내고, 사랑을 표현하는 방법을 다양하게 시도해보세요.`;
  //     default:
  //       return "";
  //   }
  // };

  return (
    <S.Container>
      <h1>주간 감정 요약을 통해 자신을 더 깊이 이해하세요</h1>
      <p>
        상단의 캘린더 각 날짜를 클릭하면 그 날의 주요 감정을 살펴볼 수 있습니다.
        각 날짜에 해당하는 꽃 이모티콘을 통해 주요 감정 상태를 볼 수 있습니다.
      </p>
      <S.Header>
        <button onClick={goToPreviousWeek}>◀</button>
        <h2>
          {currentYear}년 {currentMonth}월
        </h2>
        <button onClick={goToNextWeek}>▶</button>
      </S.Header>
      <Calender onDateSelect={handleDateSelect} currentDate={currentDate} />
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
        />
      </S.GraphContainer>
      <S.ReportBox>
        <h3>이번 주 감정 분석 리포트</h3>
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
