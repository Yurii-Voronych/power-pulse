"use client";
import { SettingsIcon } from "./icons/SettingsIcon";
import { UserIcon } from "./icons/UserIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuIcon } from "./icons/MenuIcon";
import LogOutBtn from "./LogOutBtn";
import { useModalStore } from "./ui/modal/modal.store";
import MobileMenu from "./MobileMenu";
import { formatDiaryDate } from "@/lib/shared/utils/diaryDate";

const HeaderSettings = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);
  const open = useModalStore((s) => s.open);
  const todayDiaryHref = `/diary/${formatDiaryDate(new Date())}`;
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
            <Link href={todayDiaryHref}>Diary</Link>
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
            <Link href="/exercises/body-parts">Exercises</Link>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center items-center gap-4">
        <Link href={"/profile"}>
          <SettingsIcon className="w-6 h-6 md:w-7 md:h-7" />
        </Link>

        <div className="flex justify-center items-center border border-orange rounded-full md:w-11.5 md:h-11.5">
          <UserIcon />
        </div>
        <LogOutBtn className={"max-2xl:hidden"} />
        <button
          className="inline-flex gap-2 justify-center items-center 2xl:hidden"
          onClick={() => open(<MobileMenu />, "orange")}
        >
          <MenuIcon className="md:w-8 md:h-8" />
        </button>
      </div>
    </div>
  );
};

export default HeaderSettings;
