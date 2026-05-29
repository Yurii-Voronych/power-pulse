import { DumbbellIcon } from "../icons/DumbbellIcon";

interface SportMinutesProps {
  classname?: string;
  value?: number;
}
const SportMinutes = ({ classname, value = 0 }: SportMinutesProps) => {
  return (
    <div
      className={`${classname} flex h-24 w-full flex-col justify-between rounded-xl bg-orange p-3.5 md:h-27`}
    >
      <div className="text-[12px] text-white/80 flex items-center gap-2 ">
        <DumbbellIcon />
        Daily norm of sports
      </div>
      <span className="text-[18px] font-bold md:text-2xl">{value}</span>
    </div>
  );
};

export default SportMinutes;
