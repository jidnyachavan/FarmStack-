import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CropRecommendation from "./pages/CropRecommendation";
import YieldPrediction from "./pages/YieldPrediction";
import ProfitRiskAnalysis from "./pages/ProfitRiskAnalysis";
import MarketPrices from "./pages/MarketPrices";
import PriceForecast from "./pages/PriceForecast";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route
  path="/crop-recommendation"
  element={<CropRecommendation />}
/>

<Route
  path="/yield-prediction"
  element={<YieldPrediction />}
/>

<Route
  path="/profit-risk-analysis"
  element={<ProfitRiskAnalysis />}
/>
<Route
  path="/market-prices"
  element={<MarketPrices />}
/>

<Route
  path="/price-forecast"
  element={<PriceForecast />}
/>

<Route
  path="/chatbot"
  element={<Chatbot />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;