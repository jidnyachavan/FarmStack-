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

export default API;