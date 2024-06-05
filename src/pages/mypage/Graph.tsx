import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import * as S from "./Styles/Graph.style";
import {
  HighestEmotionData,
  findWeeklyHighestEmotion,
} from "./components/findWeeklyHighestEmotion";
import api from "../../axiosInterceptor";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface GraphProps {
  startYear: number;
  startMonth: number;
  startDay: number;
  endYear: number;
  endMonth: number;
  endDay: number;
  Previous_startYear: number;
  Previous_startMonth: number;
  Previous_startDay: number;
  Previous_endYear: number;
  Previous_endMonth: number;
  Previous_endDay: number;
  setCurrentPercentages: (percentages: any) => void;
  setPreviousPercentages: (percentages: any) => void;
}

export interface EmotionData {
  date: string;
  angry: number;
  sad: number;
  delight: number;
  calm: number;
  depressed: number;
  anxiety: number;
  love: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

export const CalculatePercentage = (emotionData: EmotionData[]) => {
  const totals = {
    angry: 0,
    sad: 0,
    delight: 0,
    calm: 0,
    depressed: 0,
    anxiety: 0,
    love: 0,
  };

  emotionData.forEach((emotion: EmotionData) => {
    totals.angry += emotion.angry;
    totals.sad += emotion.sad;
    totals.delight += emotion.delight;
    totals.calm += emotion.calm;
    totals.depressed += emotion.depressed;
    totals.anxiety += emotion.anxiety;
    totals.love += emotion.love;
  });

  const count = emotionData.length;

  return {
    angry: totals.angry / count,
    sad: totals.sad / count,
    delight: totals.delight / count,
    calm: totals.calm / count,
    depressed: totals.depressed / count,
    anxiety: totals.anxiety / count,
    love: totals.love / count,
  };
};

function Chart({
  startYear,
  startMonth,
  startDay,
  endYear,
  endMonth,
  endDay,
  Previous_startYear,
  Previous_startMonth,
  Previous_startDay,
  Previous_endYear,
  Previous_endMonth,
  Previous_endDay,
  setCurrentPercentages,
  setPreviousPercentages,
}: GraphProps) {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Emotion Distribution",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
  //     // console.log("Access token retrieved:", token);
  //   } else {
  //     console.log("token error");
  //   }
  // }, []);

  // 현재주
  useEffect(() => {
    const fetchEmotionStatistics = async (
      startYear: number,
      startMonth: number,
      startDay: number,
      endYear: number,
      endMonth: number,
      endDay: number
    ) => {
      try {
        const response = await api.get("/statistic/emotion", {
          params: {
            startYear,
            startMonth,
            startDay,
            endYear,
            endMonth,
            endDay,
          },
        });
        const data = response.data;

        // console.log("[Graph response: ", data, "]");

        const emotionCounts = {
          angry: 0,
          sad: 0,
          delight: 0,
          calm: 0,
          depressed: 0,
          anxiety: 0,
          love: 0,
        };

        const highestEmotions: HighestEmotionData[] =
          findWeeklyHighestEmotion(data);
        // console.log("[Highest Emotions: ", highestEmotions, "]");

        highestEmotions.forEach((entry: HighestEmotionData) => {
          switch (entry.highestEmotion) {
            case "angry":
              emotionCounts.angry += 1;
              break;
            case "sad":
              emotionCounts.sad += 1;
              break;
            case "delight":
              emotionCounts.delight += 1;
              break;
            case "calm":
              emotionCounts.calm += 1;
              break;
            case "depressed":
              emotionCounts.depressed += 1;
              break;
            case "anxiety":
              emotionCounts.anxiety += 1;
              break;
            case "love":
              emotionCounts.love += 1;
              break;
            default:
              break;
          }
        });

        const totalEmotionCount = Object.values(emotionCounts).reduce(
          (acc, count) => acc + count,
          0
        );
        setIsEmpty(totalEmotionCount === 0);

        setChartData({
          labels: [
            "Angry",
            "Sad",
            "Delight",
            "Calm",
            "depressed",
            "Anxiety",
            "Love",
          ],
          datasets: [
            {
              label: "Emotion Distribution",
              data: [
                emotionCounts.angry,
                emotionCounts.sad,
                emotionCounts.delight,
                emotionCounts.calm,
                emotionCounts.depressed,
                emotionCounts.anxiety,
                emotionCounts.love,
              ],
              backgroundColor: [
                "#FF6384", // Angry
                "#36A2EB", // Sad
                "#FFCE56", // Delight
                "#4BC0C0", // Calm
                "#9966FF", // depressed
                "#FF9F40", // Anxiety
                "#FFCD56", // Love
              ],
            },
          ],
        });

        const current_percentages = CalculatePercentage(data);
        setCurrentPercentages(current_percentages);
      } catch (error: any) {
        if (error.response && error.response.data) {
          if (error.response.data.code === "SAG1") {
            console.log("외부 API와 통신이 불가능합니다.");
          } else {
            console.log("주간감정통계를 가져오는 데 실패했습니다.");
          }
        } else {
          console.log("알 수 없는 오류가 발생했습니다.");
        }
      }
    };

    fetchEmotionStatistics(
      startYear,
      startMonth,
      startDay,
      endYear,
      endMonth,
      endDay
    );
  }, []);
  // }, [startYear, startMonth, startDay, endYear, endMonth, endDay]);

  // 이전 주
  useEffect(() => {
    const fetchEmotionStatistics2 = async (
      Previous_startYear: number,
      Previous_startMonth: number,
      Previous_startDay: number,
      Previous_endYear: number,
      Previous_endMonth: number,
      Previous_endDay: number
    ) => {
      try {
        const response = await api.get("/statistic/emotion", {
          params: {
            startYear: Previous_startYear,
            startMonth: Previous_startMonth,
            startDay: Previous_startDay,
            endYear: Previous_endYear,
            endMonth: Previous_endMonth,
            endDay: Previous_endDay,
          },
        });
        const data = response.data;

        // console.log("[Graph response: ", data, "]");

        const previous_percentages = CalculatePercentage(data);
        setPreviousPercentages(previous_percentages);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Emotion statistics fetch error: ", error.message);
          if (error.response) {
            console.error("Error response data: ", error.response.data);
          }
        } else {
          console.error("Error: ", error);
        }
      }
    };

    fetchEmotionStatistics2(
      Previous_startYear,
      Previous_startMonth,
      Previous_startDay,
      Previous_endYear,
      Previous_endMonth,
      Previous_endDay
    );
  }, []);
  // }, [
  //   Previous_startYear,
  //   Previous_startMonth,
  //   Previous_startDay,
  //   Previous_endYear,
  //   Previous_endMonth,
  //   Previous_endDay,
  // ]);

  return (
    <div>
      <h2>Weekly Emotion Distribution</h2>
      {isEmpty ? (
        <S.Emptymessage>이번 주 일기를 작성해주세요</S.Emptymessage>
      ) : (
        <>
          <Pie data={chartData} />
        </>
      )}
    </div>
  );
}

export default Chart;
