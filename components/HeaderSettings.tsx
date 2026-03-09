"use client";
import { logoutUser } from "@/lib/api/authApi";
import { LogOutIcon } from "./icons/LogOut";
import { SettingsIcon } from "./icons/SettingsIcon";
import { UserIcon } from "./icons/UserIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MenuIcon } from "./icons/MenuIcon";

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
    <div className="flex justify-center items-center gap-8">
      <nav className="hidden 2xl:block">
        <ul className="flex justify-center items-center gap-4">
          <li>
            <Link href={"/"}>Diary</Link>
          </li>
          <li>
            <Link href={"/"}>Products</Link>
          </li>
          <li>
            <Link href={"/"}>Exercises</Link>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center items-center gap-4">
        <Link href={"/profile/edit"}>
          <SettingsIcon className="w-6 h-6 md:w-7 md:h-7" />
        </Link>

        <div className="flex justify-center items-center border border-orange rounded-full md:w-11.5 md:h-11.5">
          <UserIcon />
        </div>
        <button
          onClick={handleLogOut}
          className="2xl:inline-flex gap-2 justify-center items-center hidden "
        >
          LogOut
          <LogOutIcon />
        </button>
        <button
          onClick={handleLogOut}
          className="inline-flex gap-2 justify-center items-center 2xl:hidden"
        >
          <MenuIcon className="md:w-8 md:h-8" />
        </button>
      </div>
    </div>
  );
};

export default HeaderSettings;
