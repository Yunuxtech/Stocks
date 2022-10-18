import React, { useState } from "react";
import Chart from "react-apexcharts";

function StockChart({ chartData, stockId }) {
  const [dateFormat, setDateFormat] = useState("24h");
  const { day, week, year } = chartData;

//   checking for selected datetime format
  const selectedDateFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };
  //   checking if the stock is going up or down


  const color =
    selectedDateFormat()[selectedDateFormat().length - 1].y -
    selectedDateFormat()[0].y > 0 ? "#26C281" :"#ed3419"

  const option = {
    colors:[color],
    title: {
      text: stockId,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "Stock Data",
      animation: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };
  const series = [
    {
      name: stockId,
      data: selectedDateFormat(),
    },
  ];
  const buttonSelected = (button) => {
    const classes = "btn m-1 ";
    if (button === dateFormat) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  };
  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={option} series={series} type="area" width="100%" />
      <div>
        <button
          className={buttonSelected("24h")}
          onClick={() => setDateFormat("24h")}
        >
          24h
        </button>
        <button
          className={buttonSelected("7d")}
          onClick={() => setDateFormat("7d")}
        >
          7d
        </button>
        <button
          className={buttonSelected("1y")}
          onClick={() => setDateFormat("1y")}
        >
          1y
        </button>
      </div>
    </div>
  );
}

export default StockChart;
