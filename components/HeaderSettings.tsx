"use client";
import { logoutUser } from "@/lib/api/authApi";
import { LogOutIcon } from "./icons/LogOut";
import { SettingsIcon } from "./icons/SettingsIcon";
import { UserIcon } from "./icons/UserIcon";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { MenuIcon } from "./icons/MenuIcon";
import useAuthStore from "@/lib/store/authStore";

const HeaderSettings = () => {
  const pathname = usePathname();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isActive = (path: string) => pathname.startsWith(path);
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await logoutUser();
      clearAuth();
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div className="flex justify-center items-center gap-8">
      <nav className="hidden 2xl:block">
        <ul className="flex justify-center items-center gap-4">
          <li
            className={`flex justify-center items-center border rounded-xl w-22.75 h-11
  ${
    isActive("/diary")
      ? "border-orange bg-orange"
      : "border-[rgba(239,237,232,0.2)]"
  }`}
          >
            <Link href={"/diary"}>Diary</Link>
          </li>
          <li
            className={`flex justify-center items-center border rounded-xl w-22.75 h-11
  ${
    isActive("/products")
      ? "border-orange bg-orange"
      : "border-[rgba(239,237,232,0.2)]"
  }`}
          >
            <Link href={"/products"}>Products</Link>
          </li>
          <li
            className={`flex justify-center items-center border rounded-xl w-22.75 h-11
  ${
    isActive("/exercises")
      ? "border-orange bg-orange"
      : "border-[rgba(239,237,232,0.2)]"
  }`}
          >
            <Link href={"/exercises"}>Exercises</Link>
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
          Logout
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
