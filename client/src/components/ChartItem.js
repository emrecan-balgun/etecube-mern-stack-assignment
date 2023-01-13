import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Loading from "./Loading";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ChartItem({ datas, loading }) {
  const data = {
    labels: datas.labels,
    datasets: [
      {
        label: datas.title,
        data: datas.data,
        backgroundColor: "rgba(0,33,64,255)",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = datas.options;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="hidden sm:block w-full xl:w-1/2 xl:h-1/6">
          <Bar data={data} options={options} />
        </div>
      )}
    </>
  );
}

export default ChartItem;
