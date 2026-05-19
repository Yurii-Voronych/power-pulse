import { User } from "@/lib/shared/types/user";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),
}));

export default useAuthStore;
