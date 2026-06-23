"use client";
import { SettingsIcon } from "./icons/SettingsIcon";
import { UserIcon } from "./icons/UserIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FocusEvent, useState } from "react";
import { MenuIcon } from "./icons/MenuIcon";
import LogOutBtn from "./LogOutBtn";
import { useModalStore } from "./ui/modal/modal.store";
import MobileMenu from "./MobileMenu";
import { formatDiaryDate } from "@/lib/shared/utils/diaryDate";

const HeaderSettings = () => {
  const pathname = usePathname();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const isActive = (path: string) => pathname.startsWith(path);
  const open = useModalStore((s) => s.open);
  const todayDiaryHref = `/diary/${formatDiaryDate(new Date())}`;

  const handleProfileMenuBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsProfileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="hidden 2xl:block">
        <ul className="flex justify-center items-center gap-4">
          <li>
            <Link
              href={todayDiaryHref}
              className={`flex justify-center items-center border rounded-xl w-30 h-11 hover:bg-white/7 transition-colors duration-200
              ${isActive("/diary") ? "border-orange" : "border-white/20 text-white/70 hover:text-white"}`}
            >
              Diary
            </Link>
          </li>
          <li>
            <Link
              href={"/products"}
              className={`flex justify-center items-center border rounded-xl w-30 h-11 hover:bg-white/7 transition-colors duration-200
              ${isActive("/products") ? "border-orange" : "border-white/20 text-white/70 hover:text-white"}`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/exercises/body-parts"
              className={`flex justify-center items-center border rounded-xl w-30 h-11 hover:bg-white/7 transition-colors duration-200
              ${isActive("/exercises") ? "border-orange" : "border-white/20 text-white/70 hover:text-white"}`}
            >
              Exercises
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center items-center gap-4">
        <div
          className="relative max-2xl:hidden"
          onMouseEnter={() => setIsProfileMenuOpen(true)}
          onMouseLeave={() => setIsProfileMenuOpen(false)}
          onFocus={() => setIsProfileMenuOpen(true)}
          onBlur={handleProfileMenuBlur}
        >
          <button
            type="button"
            className="text-white/60 transition-colors duration-200 hover:text-white group-focus-within:text-white"
            aria-label="Open profile menu"
          >
            <SettingsIcon className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <div
            className={`absolute right-0 top-full z-10 flex w-max flex-col gap-1 rounded-lg border border-white/20 bg-black/90 p-2 text-white shadow-lg transition-all duration-200 ${
              isProfileMenuOpen
                ? "visible translate-y-2 opacity-100"
                : "invisible translate-y-1 opacity-0"
            }`}
          >
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-white/70 transition-colors duration-200 hover:text-orange"
              onClick={() => setIsProfileMenuOpen(false)}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-orange">
                <UserIcon className="h-4 w-4" />
              </span>
              Profile
            </Link>
            <LogOutBtn
              className="items-center rounded-md px-2 py-1.5 text-white/70 transition-colors duration-200 hover:text-orange"
              onSuccess={() => setIsProfileMenuOpen(false)}
            />
          </div>
        </div>
        <button
          className="inline-flex gap-2 justify-center items-center 2xl:hidden"
          onClick={() => open(<MobileMenu />, "orange")}
        >
          <MenuIcon className="md:w-8 md:h-8" />
        </button>
      </div>
    </>
  );
};

export default HeaderSettings;
