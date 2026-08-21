import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCropRecommendation = async (farmData) => {
  const response = await API.post(
    "/api/crop/recommend",
    farmData
  );

  return response.data;
};


export const predictPrice = async (data) => {
  const response = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commodity: data.commodity,
      state: data.state,
      district: data.district,
      market: data.market,
      variety: data.variety,
      arrival_date: data.arrivalDate,
    }),
  });

  if (!response.ok) {
    throw new Error("Price prediction failed");
  }

  return await response.json();
};
export default API;
export const getMarketPrices = async (filters) => {
  const response = await fetch("http://127.0.0.1:8000/market-prices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commodity: filters.commodity,
      state: filters.state,
      district: filters.district,
      market: filters.market,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch market prices");
  }

  return await response.json();
};

export const sendChatMessage = async (message) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/chat",
      {
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.reply;
  } catch (error) {
    console.error("FarmStack AI Error:", error);

    if (error.response) {
      console.error("Backend response:", error.response.data);
    } else if (error.request) {
      console.error("Backend not reachable:", error.request);
    }

    throw new Error("Could not connect to FarmStack AI");
  }
};