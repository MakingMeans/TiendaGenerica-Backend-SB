import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.debug("➡️ API Request:", config.method, config.url, config.data || config.params);

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.debug("⬅️ API Response:", response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    console.error("❌ API Response Error:", {
      status,
      url: error?.config?.url,
      data: error?.response?.data,
      message: error?.message,
    });

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);