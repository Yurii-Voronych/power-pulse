import { PlayIcon } from "../icons/PlayIcon";
interface VideoProps {
  className?: string;
}
const Video = ({ className }: VideoProps) => {
  return (
    <div
      className={`${className} w-36.5 md:w-51.5 h-16.5 md:h-24 bg-[#303030] rounded-xl  pl-4.5 md:pl-5.75 pt-4.5 md:pt-7 font-normal text-[12px] leading-normal text-white/65 flex gap-1 md:gap-3`}
    >
      <div className="bg-orange-1 rounded-[50%] w-7.5 md:w-10 h-7.5 md:h-10 flex justify-center items-center ">
        <PlayIcon className="text-white w-4 h-4 translate-x-0.75 translate-y-px" />
      </div>
      <div className="flex flex-col md:gap-2 leading-none md:relative bottom-2.5">
        <span className="text-white font-semibold text-[16px] md:text-[24px] leading-[1.125]">
          350+
        </span>
        <span className="text-white/60 text-[12px] md:text-[16px] font-normal">
          Video tutorial
        </span>
      </div>
    </div>
  );
};

export default Video;
