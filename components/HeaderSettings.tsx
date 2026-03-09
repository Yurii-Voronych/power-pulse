"use client";
import { logoutUser } from "@/lib/api/authApi";
import { LogOut } from "./icons/LogOut";
import { SettingsIcon } from "./icons/SettingsIcon";
import { UserIcon } from "./icons/UserIcon";
import { useRouter } from "next/navigation";

const HeaderSettings = () => {
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await logoutUser();
      router.replace("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div className="flex justify-center items-center gap-4">
      <SettingsIcon />

      <div className="flex justify-center items-center border border-orange rounded-full w-11.5 h-11.5">
        <UserIcon />
      </div>
      <button
        onClick={handleLogOut}
        className="inline-flex gap-2 justify-center items-center "
      >
        LogOut
        <LogOut />
      </button>
    </div>
  );
};

export default HeaderSettings;
