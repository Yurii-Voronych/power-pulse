import { DumbbellIcon } from "../icons/DumbbellIcon";

interface SportMinutesProps {
  classname?: string;
  value?: number;
}
const SportMinutes = ({ classname, value = 0 }: SportMinutesProps) => {
  return (
    <div
      className={`${classname} flex flex-col justify-between bg-orange rounded-xl w-41.25 h-24 p-3.5 md:w-53.5 md:h-27`}
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
