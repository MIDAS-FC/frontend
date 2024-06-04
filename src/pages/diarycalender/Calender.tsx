import { useState } from "react";
import BlueDaisy from "../../assets/icons/flowers/BlueDaisy.webp";
import Chamomile from "../../assets/icons/flowers/Chamomile.webp";
import Dahlia from "../../assets/icons/flowers/Dahlia.webp";
import Lilac from "../../assets/icons/flowers/Lilac.webp";
import Rose from "../../assets/icons/flowers/Rose.webp";
import Sunflower from "../../assets/icons/flowers/Sunflower.webp";
import Tulip from "../../assets/icons/flowers/Tulip.webp";
import { DiaryInfoResponse } from "./DiaryCalender";
import * as S from "./Styles/Calender.style";

interface CalenderProps {
  onDateSelect: (day: number, month: number, year: number) => void;
  monthInfo: DiaryInfoResponse[] | null;
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

// const getFlowerForDay = (
//   year: number,
//   month: number,
//   day: number,
//   monthInfo: DiaryInfoResponse[] | null
// ): { image: string; description: string } | undefined => {
//   const diaryEntry = monthInfo?.find((entry) => {
//     const entryDate = new Date(entry.date);
//     return (
//       entryDate.getFullYear() === year &&
//       entryDate.getMonth() + 1 === month &&
//       entryDate.getDate() === day
//     );
//   });
//   return diaryEntry
//     ? {
//         image: flowerImageMap[diaryEntry.flower],
//         description: flowerDescriptionMap[diaryEntry.flower],
//       }
//     : undefined;
// };

const getFlowerForDay = (
  year: number,
  month: number,
  day: number,
  monthInfo: DiaryInfoResponse[] | null
): string | undefined => {
  const diaryEntry = monthInfo?.find((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getFullYear() === year &&
      entryDate.getMonth() + 1 === month &&
      entryDate.getDate() === day
    );
  });
  return diaryEntry ? flowerImageMap[diaryEntry.flower] : undefined;
};

function Calender({ onDateSelect, monthInfo }: CalenderProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  const [hoveredFlower, setHoveredFlower] = useState<string | null>(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateMatrix = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;

    const firstDay = new Date(year, month - 1, 1).getDay();
    const totalDays = new Date(year, month, 0).getDate();

    const matrix = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      const flower = getFlowerForDay(year, month, day, monthInfo);

      week.push({
        day,
        isToday:
          day === today.getDate() &&
          month === today.getMonth() + 1 &&
          year === today.getFullYear(),
        flower,
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
              <S.Th key={day}>{day}</S.Th>
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
                    <>
                      {cell.isToday ? <S.Today>{cell.day}</S.Today> : cell.day}
                      {cell.flower && (
                        <S.FlowerContainer
                          onMouseEnter={() =>
                            setHoveredFlower(cell.flower || null)
                          }
                          onMouseLeave={() => setHoveredFlower(null)}
                        >
                          <S.Flower src={cell.flower} alt="flower" />
                        </S.FlowerContainer>
                      )}
                    </>
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

<<<<<<< HEAD
export default Calender;
=======
export default Calender;
>>>>>>> 264d80643a6d9a2887cbce5cad0184ca5e671a8d
