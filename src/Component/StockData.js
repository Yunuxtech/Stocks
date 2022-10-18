import React, { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";
const StockData = ({ stockId }) => {
  let isMounted = true;
  const [stockData, setStockData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/stock/profile2", {
          params: {
            symbol: stockId,
          },
        });
        // console.log(response)
        if (isMounted) {
          setStockData(response.data);
          console.log(stockData)
        }
      } catch (error) {}
    };
    fetchData();
    return () => (isMounted = false);
  }, [stockId]);
  // const {
  //   name,
  //   country,
  //   ticker,
  //   exchange,
  //   finnhubIndustry,
  //   ipo,
  //   marketCapitalization,
  //   shareOutstanding,
  //   weburl,
  // } = stockData;
  return (
    <div>
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5 mb-5">
          <div className="col">
            <div>
              <span className="fw-bold">Name: </span>
              {stockData.name}
            </div>
            <div>
              <span className="fw-bold">Country: </span>
              {stockData.country}
            </div>
            <div>
              <span className="fw-bold">Ticker: </span>
              {stockData.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span className="fw-bold">finnhub Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span className="fw-bold">IPO: </span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">market Capitalization: </span>
              {stockData.marketCapitalization}
            </div>
            <div>
              <span className="fw-bold">share Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div>
              <span className="fw-bold">Url: </span>
              <a href={stockData.weburl}>{stockData.weburl}</a>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockData;
