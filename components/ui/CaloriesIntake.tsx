"use client";
import useAuthStore from "@/lib/client/store/authStore";
import { ForkIcon } from "../icons/ForkIcon";
interface CaloriesIntakeProps {
  classname?: string;
}
const CaloriesIntake = ({ classname }: CaloriesIntakeProps) => {
  const user = useAuthStore((s) => s.user);
  return (
    <div
      className={`${classname} flex flex-col justify-between bg-orange rounded-xl w-41.25 h-24 p-3.5 md:w-53.5 md:h-27`}
    >
      <div className="text-[12px] text-white/80 flex items-center gap-2 ">
        <ForkIcon />
        Daily calorie intake
      </div>
      <span className="text-[18px] font-bold md:text-2xl">
        {user?.dailyNorm?.calories}
      </span>
    </div>
  );
};

export default CaloriesIntake;
