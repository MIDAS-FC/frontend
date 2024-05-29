import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../axiosInterceptor.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GraphProps {
  startYear: number;
  startMonth: number;
  startDay: number;
  endYear: number;
  endMonth: number;
  endDay: number;
}

function Chart({
  startYear,
  startMonth,
  startDay,
  endYear,
  endMonth,
  endDay,
}: GraphProps) {
  // 토큰 관련

  // 토큰 관련
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization-Access"] = `Bearer ${token}`;
      console.log("Access token retrieved:", token);
    } else {
      console.log("token error");
    }
  }, []);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      { label: "angry", data: [], backgroundColor: "rgba(255, 102, 102, 0.5)" },
      { label: "sad", data: [], backgroundColor: "rgba(135, 206, 235, 0.5)" },
      {
        label: "delight",
        data: [],
        backgroundColor: "rgba(255, 255, 153, 0.5)",
      },
      { label: "calm", data: [], backgroundColor: "rgba(186, 85, 211, 0.5)" },
      {
        label: "embarrased",
        data: [],
        backgroundColor: "rgba(211, 211, 211, 0.5)",
      },
      {
        label: "anxiety",
        data: [],
        backgroundColor: "rgba(100, 202, 100, 0.5)",
      },
    ],
  });

  // 감정 통계 데이터 가져오기
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
        console.log("[Grpah response: ", response.data, "]");
        const labels = data.map((entry: any) => entry.date);
        const angryData = data.map((entry: any) => entry.angry);
        const sadData = data.map((entry: any) => entry.sad);
        const delightData = data.map((entry: any) => entry.delight);
        const calmData = data.map((entry: any) => entry.calm);
        const embarrasedData = data.map((entry: any) => entry.embarrased);
        const anxietyData = data.map((entry: any) => entry.anxiety);

        setChartData({
          labels,
          datasets: [
            {
              label: "angry",
              data: angryData,
              backgroundColor: "rgba(255, 102, 102, 0.5)",
            },
            {
              label: "sad",
              data: sadData,
              backgroundColor: "rgba(135, 206, 235, 0.5)",
            },
            {
              label: "delight",
              data: delightData,
              backgroundColor: "rgba(255, 255, 153, 0.5)",
            },
            {
              label: "calm",
              data: calmData,
              backgroundColor: "rgba(186, 85, 211, 0.5)",
            },
            {
              label: "embarrased",
              data: embarrasedData,
              backgroundColor: "rgba(211, 211, 211, 0.5)",
            },
            {
              label: "anxiety",
              data: anxietyData,
              backgroundColor: "rgba(100, 202, 100, 0.5)",
            },
          ],
        });
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
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "500px", width: "600px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default Chart;
