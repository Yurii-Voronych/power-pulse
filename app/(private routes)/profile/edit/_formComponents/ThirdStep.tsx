import { NextIcon } from "@/components/icons/NextArrowIcon";

import type { Dispatch, SetStateAction } from "react";
import type { ProfileSetupStep } from "../EditProfileForm";

interface ThirdStepProps {
  setStep: Dispatch<SetStateAction<ProfileSetupStep>>;
  isSubmitting: boolean;
}
const ThirdStep = ({ setStep, isSubmitting }: ThirdStepProps) => {
  return (
    <>
      <h1 className="text-2xl leading-[1.66] md:text-[32px] md:leading-[1.38] font-bold pt-31.75 mb-3.5 2xl:pt-50">
        Profile setup complete
      </h1>
      <p className="text-[14px] leading-[1.29] mb-7 text-white/30 w-83.75">
        Dear user, thank you for filling in all the required data. We greatly
        appreciate your cooperation and commitment to a healthy lifestyle. The
        collected information will allow us to provide you with a more
        individual and personalized approach.
      </p>
      <div className="flex gap-4 ">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Go"}
        </button>
        <button
          className="disabled:opacity-40 btn-outline"
          disabled={isSubmitting}
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
