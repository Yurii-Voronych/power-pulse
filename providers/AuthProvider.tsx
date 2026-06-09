"use client";

import { getCurrentUser } from "@/lib/client/api/userApi";
import useAuthStore from "@/lib/client/store/authStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}
const skipAuthInitRoutes = ["/", "/auth/login", "/auth/register"];
const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const path = usePathname();
  useEffect(() => {
    const initAuth = async () => {
      if (skipAuthInitRoutes.includes(path)) {
        clearAuth();
        return;
      }

      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch {
        clearAuth();
      }
    };

    initAuth();
  }, [setUser, clearAuth, path]);

  return <>{children}</>;
};

export default AuthProvider;
