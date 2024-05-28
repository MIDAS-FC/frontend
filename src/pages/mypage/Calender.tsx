import React, { useState } from "react";
import * as S from "./Styles/Calender.style";

interface CalenderProps {
  onDateSelect: (day: number, month: number) => void;
  currentDate: Date;
}

function Calender({ onDateSelect, currentDate }: CalenderProps) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getWeekDates = () => {
    const startOfWeek = currentDate.getDate() - currentDate.getDay();
    const endOfWeek = startOfWeek + 6;

    const week = [];
    for (let i = startOfWeek; i <= endOfWeek; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      week.push({
        day: date.getDate(),
        isToday: date.toDateString() === new Date().toDateString(),
        month: date.getMonth(),
        year: date.getFullYear(),
      });
    }
    return week;
  };

  const week = getWeekDates();

  return (
    <S.CalendarWrapper>
      <S.Table>
        <S.Thead>
          <tr>
            {daysOfWeek.map((day, idx) => (
              <th key={idx}>{day}</th>
            ))}
          </tr>
        </S.Thead>
        <tbody>
          <tr>
            {week.map((cell, idx) => (
              <S.Td
                key={idx}
                onClick={() => onDateSelect(cell.day, cell.month + 1)}
              >
                {cell.isToday ? <S.Today>{cell.day}</S.Today> : cell.day}
              </S.Td>
            ))}
          </tr>
        </tbody>
      </S.Table>
    </S.CalendarWrapper>
  );
}

export default Calender;
