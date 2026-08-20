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