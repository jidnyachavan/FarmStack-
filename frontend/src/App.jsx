import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CropRecommendation from "./pages/CropRecommendation";

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
      </Routes>

    </BrowserRouter>
  );
}

export default App;