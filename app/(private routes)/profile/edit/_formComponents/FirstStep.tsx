import { ErrorIcon } from "@/components/icons/ErrorIcon";
import { ErrorMessage, Field, FormikErrors } from "formik";

import { NextIcon } from "@/components/icons/NextArrowIcon";
import { Dispatch, SetStateAction } from "react";

import toast from "react-hot-toast";
import { EditProfileFormValues } from "../EditProfileForm";
import BirthdayInput from "./BirthdayInput";
interface FirstStepProps {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  validateForm: () => Promise<FormikErrors<EditProfileFormValues>>;
}
const FirstStep = ({ setStep, validateForm }: FirstStepProps) => {
  const handleClick = async () => {
    const errors = await validateForm();
    if (
      !errors.height &&
      !errors.currentWeight &&
      !errors.desiredWeight &&
      !errors.birthday
    ) {
      setStep(2);
    } else {
      toast.error("Please, fill all form fields");
    }
  };
  return (
    <>
      <p className="text-2xl md:text-[32px] leading-[1.66] md:leading-[1.38] font-bold pt-31.75  mb-3.5 md:mb-4 2xl:pt-50">
        Get Closer To Your Goals
      </p>
      <p className="text-[14px] leading-[1.29] md:text-[16px] md:leading-normal mb-7 md:mb-13.5 text-white/30 w-83.75 md:w-124">
        To ensure a personalized user experience and the proper functioning of
        our platform, we ask you to provide the following information about your
        weight, height and other relevant data:
      </p>
      <div className="grid grid-cols-2 gap-3.5 mb-7 justify-items-start md:grid-cols-3 md:w-131.75 md:mb-8">
        <div className="relative">
          <Field
            id="height"
            name="height"
            type="text"
            className="w-full h-11.5 2xl:h-12 p-3.5 border border-white/30 rounded-xl"
            placeholder="Height"
          />
          <ErrorMessage name="height">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div className="relative">
          <Field
            id="currentWeight"
            name="currentWeight"
            type="text"
            className="w-full h-11.5 2xl:h-12 p-3.5 border border-white/30 rounded-xl "
            placeholder="Current Weight"
          />
          <ErrorMessage name="currentWeight">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div className="relative">
          <Field
            id="desiredWeight"
            name="desiredWeight"
            type="text"
            className="w-full h-11.5 2xl:h-13 p-3.5 border border-white/30 rounded-xl"
            placeholder="Desired Weight"
          />
          <ErrorMessage name="desiredWeight">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div className="relative">
          <BirthdayInput name="birthday" />
          <ErrorMessage name="birthday">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
      </div>
      <button
        className="flex items-center gap-2"
        onClick={handleClick}
        type="button"
      >
        Next <NextIcon />
      </button>
    </>
  );
};

export default FirstStep;
