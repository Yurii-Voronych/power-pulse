import { PersonIcon } from "../icons/PersonIcon";
interface CaloriesProps {
  className?: string;
}
const Calories = ({ className }: CaloriesProps) => {
  return (
    <div
      className={`${className} w-29.75 md:w-45 h-19 md:h-27.5 bg-orange-1 rounded-xl relative pl-4.5 pt-9.5 font-bold text-[12px] md:text-[16px] leading-normal text-white/65`}
    >
      <div className="bg-beige rounded-[50%] w-6 h-6 flex justify-center items-center absolute top-3.5 left-7">
        <PersonIcon className="text-white w-4 h-4" />
      </div>
      <span
        className="font-bold
            text-white
            text-[24px] md:text-5xl
            mr-2.5
            leading-[1.04]"
      >
        500
      </span>
      cal
    </div>
  );
};

export default Calories;
