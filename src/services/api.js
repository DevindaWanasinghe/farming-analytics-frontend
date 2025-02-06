import axios from "axios";
import { isTokenValid } from "../Validator.js";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Request interceptor for adding Authorization headers
api.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !isTokenValid(accessToken)) {
    if (!refreshToken || !isTokenValid(refreshToken)) {
      // If refresh token is also expired, log out the user
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject("Session expired. Redirecting to login...");
    }

    try {
      // Request a new access token using refresh token
      const response = await axios.post("http://localhost:3001/api/auth/refresh", {
        refreshToken,
      });

      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Refresh token expired. Redirecting to login...");
      localStorage.clear();
      window.location.href = "/";
      return Promise.reject("Session expired. Redirecting to login...");
    }
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default api;
