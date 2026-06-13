import axios from "axios";
import useAuthStore from "@/lib/client/store/authStore";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let isRedirectingToLogin = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.startsWith("/auth/")) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !isRedirectingToLogin
    ) {
      isRedirectingToLogin = true;
      useAuthStore.getState().clearAuth();
      window.location.replace("/auth/login");
    }

    return Promise.reject(error);
  },
);

export default api;
