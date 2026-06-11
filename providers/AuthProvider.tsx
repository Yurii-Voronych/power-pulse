"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib/client/api/userApi";
import useAuthStore from "@/lib/client/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

const publicRoutes = ["/", "/auth/login", "/auth/register"];

const AuthProvider = ({ children }: AuthProviderProps) => {
  const initialized = useRef(false);
  const pathname = usePathname();

  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    if (publicRoutes.includes(pathname)) {
      clearAuth();
      return;
    }

    const initializeAuth = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch {
        clearAuth();
      }
    };

    initializeAuth();
  }, [pathname, setUser, clearAuth]);

  return children;
};

export default AuthProvider;
