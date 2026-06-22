import axios from "axios";

export const api = axios.create({
  baseURL: "https://aplicaciones-web-2urn.vercel.app/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vivero_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
