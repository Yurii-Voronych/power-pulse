import { NextIcon } from "@/components/icons/NextArrowIcon";
import { Dispatch, SetStateAction } from "react";

interface ThirdStepProps {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
}
const ThirdStep = ({ setStep }: ThirdStepProps) => {
  return (
    <>
      <p className="text-2xl leading-[1.66] md:text-[32px] md:leading-[1.38] font-bold pt-31.75 mb-3.5 2xl:pt-50">
        Dear user
      </p>
      <p className="text-[14px] leading-[1.29] mb-7 text-white/30 w-83.75">
        Thank you for filling in all the required data. We greatly appreciate
        your cooperation and commitment to a healthy lifestyle. The collected
        information will allow us to provide you with a more individual and
        personalized approach.
      </p>
      <div className="flex gap-4 ">
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
    </>
  );
};

export default ThirdStep;
