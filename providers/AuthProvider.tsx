"use client";

import { getCurrentUser } from "@/lib/client/api/userApi";
import useAuthStore from "@/lib/client/store/authStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch {
        clearAuth();
      }
    };

    initAuth();
  }, [setUser, clearAuth]);

  return <>{children}</>;
};

export default AuthProvider;
