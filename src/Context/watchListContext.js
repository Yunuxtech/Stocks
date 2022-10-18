import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AMZN"]
  );

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);
  const addToStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
  };
  const deleteFromStock = (stock) => {
    const newWatchList = watchList.filter((item) => item !== stock);
    setWatchList(newWatchList);
  };
  return (
    <WatchListContext.Provider
      value={{ watchList, addToStock, deleteFromStock }}
    >
      {props.children}
    </WatchListContext.Provider>
  );
};

export default WatchListContextProvider;
