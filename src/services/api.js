import axios from "axios";
import store from "../store";

export const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000`,

  withCredentials: true,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

apiClient.interceptors.request.use((config) => {
  // Get token from auth.js store
  const token = store().state["auth"].token;

  if (token) {
    config.headers.common["Authorization"] = "Bearer " + token;
  }
  return config;
});
