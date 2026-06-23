"use client";

import Link from "next/link";
import LogOutBtn from "./LogOutBtn";
import { useModalStore } from "./ui/modal/modal.store";
import CloseIcon from "./icons/CloseIcon";
import { formatDiaryDate } from "@/lib/shared/utils/diaryDate";

const MobileMenu = () => {
  const { close } = useModalStore();
  const todayDiaryHref = `/diary/${formatDiaryDate(new Date())}`;

  return (
    <div className="relative z-10">
      <button
        type="button"
        className="fixed top-10 right-10"
        onClick={() => close()}
      >
        <CloseIcon />
      </button>
      <nav>
        <ul className="flex flex-col gap-4">
          <li onClick={() => close()}>
            <Link href={todayDiaryHref} className="btn-outline">
              Diary
            </Link>
          </li>
          <li onClick={() => close()}>
            <Link href="/products" className="btn-outline">
              Products
            </Link>
          </li>
          <li onClick={() => close()}>
            <Link href="/exercises/body-parts" className="btn-outline">
              Exercises
            </Link>
          </li>
        </ul>
      </nav>
      <LogOutBtn className="fixed bottom-10 left-10" onSuccess={close} />
    </div>
  );
};

export default MobileMenu;
