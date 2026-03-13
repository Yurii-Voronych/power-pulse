import { NextIcon } from "@/components/icons/NextArrowIcon";
import { Dispatch, SetStateAction } from "react";

interface ThirdStepProps {
  setStep: Dispatch<SetStateAction<number>>;
}
const ThirdStep = ({ setStep }: ThirdStepProps) => {
  return (
    <>
      <p className="text-2xl leading-[1.66] font-bold mt-31.75 mb-3.5">
        Dear user
      </p>
      <p className="text-[14px] leading-[1.29] mb-7 text-white/30 w-83.75">
        Thank you for filling in all the required data. We greatly appreciate
        your cooperation and commitment to a healthy lifestyle. The collected
        information will allow us to provide you with a more individual and
        personalized approach.
      </p>
      <div className="flex gap-4 mb-114.75">
        <button type="submit" className="rounded-xl w-25 h-10.5 bg-orange">
          Go
        </button>
        <button
          className="flex items-center gap-2"
          type="button"
          onClick={() => {
            setStep(2);
          }}
        >
          <NextIcon className="rotate-180" />
          Back
        </button>
      </div>
      <div className="flex gap-3.5">
        <div className="w-12.5 h-1 bg-orange-1 rounded"></div>
        <div className="w-12.5 h-1 bg-orange-1 rounded"></div>
        <div className="w-12.5 h-1 bg-orange rounded"></div>
      </div>
    </>
  );
};

export default ThirdStep;
