"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib/client/api/userApi";
import useAuthStore from "@/lib/client/store/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathname = usePathname();
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (pathname.startsWith("/auth/")) return;

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
