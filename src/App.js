import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StockDetailPage from "./Pages/StockDetailPage";
import StockOverviewPage from "./Pages/StockOverviewPage";
import WatchListContextProvider from "./Context/watchListContext";
function App() {
  return (
    <div className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/details/:stockId" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
