import { AnimatePresence } from "framer-motion";
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

const flowerImageMap: { [key: string]: string } = {
  장미: Rose,
  해바라기: Sunflower,
  튤립: Tulip,
  라일락: Lilac,
  "블루 데이지": BlueDaisy,
  캐모마일: Chamomile,
  달리아: Dahlia,
};

const flowerDescriptionMap: { [key: string]: string } = {
  장미: "Rose: 분노를 상징합니다. 장미는 깊은 감정과 욕망을 상징하며, 열정적인 사랑이나 강렬한 분노와 연관되는 경우가 많습니다.",
  해바라기:
    "Sunflower: 기쁨을 상징합니다. 해바라기는 밝고 쾌활한 외모로 알려져 있으며, 행복과 긍정성을 상징하는 경우가 많습니다",
  튤립: "Tulip: 불안을 상징합니다. 라일락은 섬세한 외모와 강한 향기를 가지고 있어, 향수와 불안의 감정을 상징합니다",
  라일락:
    "Lilac: 우울을 상징합니다. 라일락은 섬세한 외모와 강한 향기로 알려져 있으며, 종종 우울과 향수의 감정을 불러일으킵니다.",
  "블루 데이지":
    "슬픔을 상징합니다. 블루 데이지는 독특하고 인상적인 외모로, 슬픔과 우울감을 상징하는 경우가 많습니다",
  캐모마일:
    "Chamomile: 중립을 상징합니다. 캐모마일 꽃은 진정한 특성으로 알려져 있어, 평화와 중립을 상징합니다.",
  달리아:
    "Dahlia: 사랑을 상징합니다. 달리아는 생동감 있고 다양한 모습으로, 영원한 유대와 깊은 사랑을 상징합니다.",
};

const getFlowerForDay = (
  year: number,
  month: number,
  day: number,
  monthInfo: DiaryInfoResponse[] | null
): { image: string; description: string } | undefined => {
  const diaryEntry = monthInfo?.find((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getFullYear() === year &&
      entryDate.getMonth() + 1 === month &&
      entryDate.getDate() === day
    );
  });
  return diaryEntry
    ? {
        image: flowerImageMap[diaryEntry.flower],
        description: flowerDescriptionMap[diaryEntry.flower],
      }
    : undefined;
};

function Calender({ onDateSelect, monthInfo }: CalenderProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  const [hoveredFlower, setHoveredFlower] = useState<{
    image: string;
    description: string;
  } | null>(null);

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
                          <S.Flower src={cell.flower?.image} alt="flower" />
                          <AnimatePresence>
                            {hoveredFlower?.image === cell.flower?.image && (
                              <S.PopupBox
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                {hoveredFlower.description}
                              </S.PopupBox>
                            )}
                          </AnimatePresence>
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

export default Calender;