import axios from "axios";

// Automatically use your Render backend in production, or localhost in dev
const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5003";

export const axiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,
  withCredentials: true, // ensures cookies (JWT/session) are sent properly
});

// Optional: Add interceptors for debugging or auth token handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);
