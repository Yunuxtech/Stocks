import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import StockChart from "../Component/StockChart";
import StockData from "../Component/StockData";

const formatData = (data) => {
  return data.l.map((element, index) => {
    return {
      x: element * 1000,
      y: Math.floor(data.c[index]) ,
    };
  });
};
function StockDetailPage() {
  const { stockId } = useParams();
  const [chartData, setChartData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 60 * 60 * 24;
      } else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 60 * 60 * 24;
      } else {
        oneDay = currentTime - 60 * 60 * 24;
      }
      try {
        const responses = await Promise.all([
          finnHub.get("stock/candle", {
            params: {
              symbol: stockId,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHub.get("stock/candle", {
            params: {
              symbol: stockId,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnHub.get("stock/candle", {
            params: {
              symbol: stockId,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
        console.log(responses);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [stockId]);
  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} stockId={stockId} />
          <StockData stockId={stockId}/>
        </div>
      )}
    </div>
  );
}

export default StockDetailPage;
