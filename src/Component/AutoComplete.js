import React, { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../Context/watchListContext";
const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addToStock } = useContext(WatchListContext);
  const handleInput = (event) => {
    setSearch(event.target.value);
    // console.log(event.target.value)
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        // console.log(response.data);
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);
  //   Handling dropdown
  const showDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map((result) => {
          const { description, symbol } = result;
          return (
            <li
              onClick={() => {
                addToStock(symbol);
                setSearch("");
              }}
              key={symbol}
              className="dropdown-item"
            >
              {description} - {symbol}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="search"
          placeholder="search"
          value={search}
          onChange={handleInput}
          style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
        />
        <label htmlFor="search">Search</label>
        {showDropdown()}
      </div>
    </div>
  );
};

export default AutoComplete;
