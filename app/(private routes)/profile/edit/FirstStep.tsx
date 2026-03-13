import { ErrorIcon } from "@/components/icons/ErrorIcon";
import { ErrorMessage, Field, FormikErrors } from "formik";
import BirthdayInput from "./BirthdayInput";
import { NextIcon } from "@/components/icons/NextArrowIcon";
import { Dispatch, SetStateAction } from "react";
import { EditProfileFormValues } from "./page";
import toast from "react-hot-toast";
interface FirstStepProps {
  setStep: Dispatch<SetStateAction<number>>;
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
      <p className="text-2xl leading-[1.66] font-bold mt-31.75 mb-3.5">
        Get Closer To Your Goals
      </p>
      <p className="text-[14px] leading-[1.29] mb-7 text-white/30 w-83.75">
        To ensure a personalized user experience and the proper functioning of
        our platform, we ask you to provide the following information about your
        weight, height and other relevant data:
      </p>
      <div className="grid grid-cols-2 gap-3.75 mb-7">
        <div className="relative">
          <Field
            id="height"
            name="height"
            type="text"
            className="w-39.75 h-11.5 p-3.5 border border-white/30 rounded-xl relative"
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
            className="w-39.75 h-11.5 p-3.5 border border-white/30 rounded-xl "
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
            className="w-39.75 h-11.5 p-3.5 border border-white/30 rounded-xl "
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
        className="flex items-center gap-2 mb-85.75"
        onClick={handleClick}
        type="button"
      >
        Next <NextIcon />
      </button>
      <div className="flex gap-3.5">
        <div className="w-12.5 h-1 bg-orange rounded"></div>
        <div className="w-12.5 h-1 bg-[#303030] rounded"></div>
        <div className="w-12.5 h-1 bg-[#303030] rounded"></div>
      </div>
    </>
  );
};

export default FirstStep;
