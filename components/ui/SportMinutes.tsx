"use client";
import useAuthStore from "@/lib/client/store/authStore";
import { DumbbellIcon } from "../icons/DumbbellIcon";

interface SportMinutesProps {
  classname?: string;
}
const SportMinutes = ({ classname }: SportMinutesProps) => {
  const user = useAuthStore((s) => s.user);
  return (
    <div
      className={`${classname} flex flex-col justify-between bg-orange rounded-xl w-41.25 h-24 p-3.5 md:w-53.5 md:h-27`}
    >
      <div className="text-[12px] text-white/80 flex items-center gap-2 ">
        <DumbbellIcon />
        Daily norm of sports
      </div>
      <span className="text-[18px] font-bold md:text-2xl">
        {user?.dailyNorm?.sportMinutes}
      </span>
    </div>
  );
};

export default SportMinutes;
