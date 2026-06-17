import axios from "axios";
import useAuthStore from "@/lib/client/store/authStore";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const protectedRoutes = ["/diary", "/profile", "/exercises", "/products"];

const isProtectedPath = (pathname: string) => {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};

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
      useAuthStore.getState().clearAuth();

      if (isProtectedPath(window.location.pathname)) {
        isRedirectingToLogin = true;
        window.location.replace("/auth/login");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
