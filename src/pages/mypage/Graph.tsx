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
import api from "../../axiosInterceptor";
import * as S from "./Styles/Graph.style";
import {
  HighestEmotionData,
  findWeeklyHighestEmotion,
} from "./components/findWeeklyHighestEmotion";

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
  embarrased: number;
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
    embarrased: 0,
    anxiety: 0,
    love: 0,
  };

  emotionData.forEach((emotion: EmotionData) => {
    totals.angry += emotion.angry;
    totals.sad += emotion.sad;
    totals.delight += emotion.delight;
    totals.calm += emotion.calm;
    totals.embarrased += emotion.embarrased;
    totals.anxiety += emotion.anxiety;
    totals.love += emotion.love;
  });

  const count = emotionData.length;

  return {
    angry: totals.angry / count,
    sad: totals.sad / count,
    delight: totals.delight / count,
    calm: totals.calm / count,
    embarrased: totals.embarrased / count,
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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
      // console.log("Access token retrieved:", token);
    } else {
      console.log("token error");
    }
  }, []);

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
        // const response = await api.get("/statistic/emotion", {
        //   params: {
        //     startYear,
        //     startMonth,
        //     startDay,
        //     endYear,
        //     endMonth,
        //     endDay,
        //   },
        // });
        // const data = response.data;

        const data = dummyEmotionData1;

        // console.log("[Graph response: ", data, "]");

        const emotionCounts = {
          angry: 0,
          sad: 0,
          delight: 0,
          calm: 0,
          embarrased: 0,
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
            case "embarrased":
              emotionCounts.embarrased += 1;
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
            "Embarrassed",
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
                emotionCounts.embarrased,
                emotionCounts.anxiety,
                emotionCounts.love,
              ],
              backgroundColor: [
                "#FF6384", // Angry
                "#36A2EB", // Sad
                "#FFCE56", // Delight
                "#4BC0C0", // Calm
                "#9966FF", // Embarrassed
                "#FF9F40", // Anxiety
                "#FFCD56", // Love
              ],
            },
          ],
        });

        const current_percentages = CalculatePercentage(data);
        setCurrentPercentages(current_percentages);
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

    fetchEmotionStatistics(
      startYear,
      startMonth,
      startDay,
      endYear,
      endMonth,
      endDay
    );
  }, [startYear, startMonth, startDay, endYear, endMonth, endDay]);

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
        // const response = await api.get("/statistic/emotion", {
        //   params: {
        // Previous_startYear,
        // Previous_startMonth,
        // Previous_startDay,
        // Previous_endYear,
        // Previous_endMonth,
        // Previous_endDay,
        //   },
        // });
        // const data = response.data;

        const data = dummyEmotionData2;
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
  }, [
    Previous_startYear,
    Previous_startMonth,
    Previous_startDay,
    Previous_endYear,
    Previous_endMonth,
    Previous_endDay,
  ]);

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

export const dummyEmotionData1: EmotionData[] = [
  {
    date: "2024-05-26",
    angry: 1.2,
    sad: 0.1,
    delight: 0.3,
    calm: 0.4,
    embarrased: 0.05,
    anxiety: 0.15,
    love: 0.25,
  },
  {
    date: "2024-05-27",
    angry: 0.15,
    sad: 1.2,
    delight: 0.25,
    calm: 0.35,
    embarrased: 0.1,
    anxiety: 0.2,
    love: 0.3,
  },
  {
    date: "2024-05-28",
    angry: 0.1,
    sad: 0.15,
    delight: 1.35,
    calm: 0.45,
    embarrased: 0.07,
    anxiety: 0.18,
    love: 0.28,
  },
  {
    date: "2024-05-29",
    angry: 0.18,
    sad: 0.12,
    delight: 0.88,
    calm: 1.42,
    embarrased: 0.08,
    anxiety: 0.22,
    love: 0.26,
  },
  {
    date: "2024-05-30",
    angry: 0.12,
    sad: 0.8,
    delight: 0.32,
    calm: 1.38,
    embarrased: 0.09,
    anxiety: 0.2,
    love: 0.24,
  },
  {
    date: "2024-05-31",
    angry: 0.22,
    sad: 0.14,
    delight: 0.34,
    calm: 0.44,
    embarrased: 1.06,
    anxiety: 0.19,
    love: 0.27,
  },
  {
    date: "2024-06-01",
    angry: 0.16,
    sad: 0.13,
    delight: 0.31,
    calm: 0.41,
    embarrased: 0.08,
    anxiety: 1.17,
    love: 0.29,
  },
];

export const dummyEmotionData2: EmotionData[] = [
  {
    date: "2024-05-19",
    angry: 0.25,
    sad: 0.65,
    delight: 5.35,
    calm: 0.45,
    embarrased: 0.1,
    anxiety: 0.2,
    love: 0.3,
  },
  {
    date: "2024-05-20",
    angry: 0.24,
    sad: 0.96,
    delight: 5.36,
    calm: 0.44,
    embarrased: 0.09,
    anxiety: 0.19,
    love: 0.29,
  },
  {
    date: "2024-05-21",
    angry: 0.23,
    sad: 0.17,
    delight: 5.37,
    calm: 0.43,
    embarrased: 0.08,
    anxiety: 0.18,
    love: 0.28,
  },
  {
    date: "2024-05-22",
    angry: 0.22,
    sad: 0.48,
    delight: 5.38,
    calm: 0.42,
    embarrased: 0.07,
    anxiety: 0.17,
    love: 0.27,
  },
  {
    date: "2024-05-23",
    angry: 0.21,
    sad: 0.19,
    delight: 5.39,
    calm: 0.41,
    embarrased: 0.06,
    anxiety: 0.16,
    love: 0.26,
  },
  {
    date: "2024-05-24",
    angry: 0.2,
    sad: 0.2,
    delight: 5.4,
    calm: 0.4,
    embarrased: 0.05,
    anxiety: 0.15,
    love: 0.25,
  },
  {
    date: "2024-05-25",
    angry: 0.19,
    sad: 0.21,
    delight: 5.41,
    calm: 0.39,
    embarrased: 0.04,
    anxiety: 0.14,
    love: 0.24,
  },
];
