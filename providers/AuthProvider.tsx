"use client";

import { useEffect } from "react";
import useAuthStore from "@/lib/client/store/authStore";
import { User } from "@/lib/shared/types/user";

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      return;
    }

    if (initialUser === null) {
      clearAuth();
    }
  }, [initialUser, setUser, clearAuth]);

  return children;
};

export default AuthProvider;
