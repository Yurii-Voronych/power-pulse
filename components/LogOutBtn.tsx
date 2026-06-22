"use client";
import { logoutUser } from "@/lib/client/api/authApi";
import useAuthStore from "@/lib/client/store/authStore";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "./icons/LogOut";
import { useState } from "react";

interface LogOutBtnProps {
  className?: string;
  onSuccess?: () => void;
}
const LogOutBtn = ({ className, onSuccess }: LogOutBtnProps) => {
  const [isPending, setIsPending] = useState(false);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();
  const handleLogOut = async () => {
    if (isPending) return;

    setIsPending(true);

    try {
      await logoutUser();
      onSuccess?.();
      router.replace("/auth/login");
      clearAuth();
    } catch (error) {
      console.error("Logout failed", error);
      setIsPending(false);
    }
  };
  return (
    <button
      onClick={handleLogOut}
      disabled={isPending}
      aria-busy={isPending}
      className={`${className} flex gap-2 disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {isPending ? "Logging out..." : "Logout"}
      <LogOutIcon />
    </button>
  );
};

export default LogOutBtn;
