import { useState } from "react";
import * as S from "./Styles/Calender.style";

interface CalenderProps {
  onDateSelect: (day: number, month: number, year: number) => void;
}

function Calender({ onDateSelect }: CalenderProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
                  {cell ? (
                    cell.isToday ? (
                      <S.Today>{cell.day}</S.Today>
                    ) : (
                      cell.day
                    )
                  ) : null}
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
