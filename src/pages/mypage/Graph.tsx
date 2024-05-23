import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "angry",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 102, 102, 0.5)",
      },
      {
        label: "sad",
        data: [12, 19, 3, 5, 2, 3, 30],
        backgroundColor: "rgba(135, 206, 235, 0.5)",
      },
      {
        label: "delight",
        data: [8, 48, 40, 19, 86, 27, 90],
        backgroundColor: "rgba(255, 255, 153, 0.5)",
      },
      {
        label: "calm",
        data: [25, 39, 20, 31, 56, 55, 40],
        backgroundColor: "rgba(186, 85, 211, 0.5)",
      },
      {
        label: "embarrased",
        data: [30, 29, 5, 5, 20, 3, 10],
        backgroundColor: "rgba(211, 211, 211, 0.5)",
      },
      {
        label: "anxiety",
        data: [30, 29, 5, 5, 20, 3, 10],
        backgroundColor: "rgba(100, 202, 100, 0.5)",
      },
    ],
  };

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
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;
