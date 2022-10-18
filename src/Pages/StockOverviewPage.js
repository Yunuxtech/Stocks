import React from "react";
import StockList from "../Component/StockList";
import AutoComplete from "../Component/AutoComplete";

function StockOverviewPage() {
  return (
    <div>
      <AutoComplete />
      <StockList />
    </div>
  );
}

export default StockOverviewPage;
