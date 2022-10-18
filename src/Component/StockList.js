import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { render } from "@testing-library/react";
import { WatchListContext } from "../Context/watchListContext";

const StockList = () => {
  const [stock, setStock] = useState([]);
  //   const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const { watchList, deleteFromStock } = useContext(WatchListContext);
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const responses = [];
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );

        // console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        // console.log(data);
        if (isMounted) {
          setStock(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    // Note the below code is been executed when the component is been unmounted
    return () => (isMounted = false);
  }, [watchList]);
  const changeColor = (value) => {
    return value > 0 ? "success" : "danger";
  };
  const renderIcon = (value) => {
    return value > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

  const selectedStock = (stockId) => {
    navigate(`details/${stockId}`);
  };
  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {watchList.length < 1 ? <b className="text-danger">No watch list availabe, search to add</b>: null}
          {stock.map((stockItem) => {
            const { c, d, dp, h, l, o, pc } = stockItem.data;
            return (
              <tr
                style={{ cursor: "pointer" }}
                className="table-row"
                key={stockItem.symbol}
                onClick={() => selectedStock(stockItem.symbol)}
              >
                <th scope="row"> {stockItem.symbol}</th>
                <td>{c}</td>
                <td className={`text-${changeColor(d)}`}>
                  {d} {renderIcon(d)}
                </td>
                <td className={`text-${changeColor(dp)}`}>
                  {dp} {renderIcon(dp)}
                </td>
                <td>{h}</td>
                <td>{l}</td>
                <td>{o}</td>
                <td>
                  {pc}{" "}
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteFromStock(stockItem.symbol);
                    }}
                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
