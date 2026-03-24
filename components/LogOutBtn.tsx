"use client";
import { logoutUser } from "@/lib/api/authApi";
import useAuthStore from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "./icons/LogOut";
interface LogOutBtnProps {
  className?: string;
  onSuccess?: () => void;
}
const LogOutBtn = ({ className, onSuccess }: LogOutBtnProps) => {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await logoutUser();
      clearAuth();
      onSuccess?.();
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <button onClick={handleLogOut} className={`${className} flex gap-2`}>
      Logout
      <LogOutIcon />
    </button>
  );
};

export default LogOutBtn;
