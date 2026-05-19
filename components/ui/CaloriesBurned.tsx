import FireIcon from "../icons/FireIcon";

interface CaloriesBurnedProps {
  classname?: string;
  value?: number;
}
const CaloriesBurned = ({ classname, value = 0 }: CaloriesBurnedProps) => {
  return (
    <div
      className={`${classname} flex flex-col justify-between bg-transparent border border-white/20 rounded-xl w-41.25 h-24 p-3.5 md:w-53.5 md:h-27`}
    >
      <div className="text-[12px] text-white/80 flex items-center gap-2 ">
        <FireIcon />
        Calories burned
      </div>
      <span className="text-[18px] font-bold md:text-2xl">{value}</span>
    </div>
  );
};

export default CaloriesBurned;
