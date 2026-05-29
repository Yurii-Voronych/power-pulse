import BubleIcon from "../icons/BubleIcon";

interface CaloriesRestProps {
  classname?: string;
  value?: number;
}
const CaloriesRest = ({ classname, value = 0 }: CaloriesRestProps) => {
  return (
    <div
      className={`${classname} flex h-24 w-full flex-col justify-between rounded-xl border border-white/20 bg-transparent p-3.5 md:h-27`}
    >
      <div className="text-[12px] text-white/80 flex items-center gap-2 ">
        <BubleIcon className="w-5 h-5" />
        The rest of the calories
      </div>
      <span className="text-[18px] font-bold md:text-2xl">{value}</span>
    </div>
  );
};

export default CaloriesRest;
