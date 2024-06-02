import { useState } from "react";
import * as S from "./Styles/Calender.style";
import angryFlower from "../../assets/icons/flowers/angry.png";
import anxietyFlower from "../../assets/icons/flowers/anxiety.png";
import calmFlower from "../../assets/icons/flowers/calm.png";
import delightFlower from "../../assets/icons/flowers/delight.png";
import depressedFlower from "../../assets/icons/flowers/depressed.png";
import loveFlower from "../../assets/icons/flowers/love.png";
import sadFlower from "../../assets/icons/flowers/sad.png";
import { HighestEmotionData } from "./components/findDayHighestEmotion";

interface CalenderProps {
  onDateSelect: (day: number, month: number, year: number) => void;
  highestEmotion: HighestEmotionData[] | null;
}

const emotionToFlowerMap: { [key: string]: string } = {
  angry: angryFlower,
  anxiety: anxietyFlower,
  calm: calmFlower,
  delight: delightFlower,
  depressed: depressedFlower,
  love: loveFlower,
  sad: sadFlower,
};

function Calender({ onDateSelect, highestEmotion }: CalenderProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // console.log("높은수", highestEmotion);

  // 꽃과 감정 매칭
  const getFlowerForDay = (day: number) => {
    if (!highestEmotion) return null;
    const emotionData = highestEmotion.find((entry) => entry.diaryId === day);
    return emotionData ? emotionToFlowerMap[emotionData.highestEmotion] : null;
  };

  const generateMatrix = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const matrix = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      week.push({
        day,
        isToday:
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
      });
      if ((firstDay + day) % 7 === 0 || day === totalDays) {
        matrix.push(week);
        week = [];
      }
    }

    return matrix;
  };

  const matrix = generateMatrix();

  return (
    <S.CalendarWrapper>
      <S.Table>
        <S.Thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </S.Thead>
        <tbody>
          {matrix.map((row, index) => (
            <tr key={index}>
              {row.map((cell, idx) => (
                <S.Td
                  key={idx}
                  onClick={() =>
                    cell &&
                    onDateSelect(
                      cell.day,
                      currentMonth.getMonth() + 1,
                      currentMonth.getFullYear()
                    )
                  }
                >
                  {cell && (
                    <S.Td
                      key={idx}
                      onClick={() =>
                        cell &&
                        onDateSelect(
                          cell.day,
                          currentMonth.getMonth() + 1,
                          currentMonth.getFullYear()
                        )
                      }
                    >
                      {getFlowerForDay(cell.day) && (
                        <S.Flower
                          src={getFlowerForDay(cell.day) || ""}
                          alt="flower Icon"
                        />
                      )}
                      {cell.isToday ? <S.Today>{cell.day}</S.Today> : cell.day}
                    </S.Td>
                  )}
                </S.Td>
              ))}
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.CalendarWrapper>
  );
}

export default Calender;
