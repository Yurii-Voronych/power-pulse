import { ErrorIcon } from "@/components/icons/ErrorIcon";
import { ErrorMessage, Field } from "formik";
import BirthdayInput from "./BirthdayInput";
import { NextIcon } from "@/components/icons/NextArrowIcon";

const SecondStep = () => {
  return (
    <>
      <h1 className="text-2xl leading-[1.66] font-bold mt-31.75 mb-3.5">
        Get Closer To Your Goals
      </h1>
      <div className="grid grid-cols-2 gap-3.5 mb-7">
        <Field
          id="height"
          name="height"
          type="text"
          className="w-39.75 h-11.5 p-3.5 border border-white/30 rounded-xl"
          placeholder="Height"
        />
        <ErrorMessage name="email">
          {(msg) => (
            <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
              <ErrorIcon /> {msg}
            </span>
          )}
        </ErrorMessage>
        <Field
          id="currentWeight"
          name="currentWeight"
          type="text"
          className="w-39.75 h-11.5 p-3.5 border border-white/30 rounded-xl"
          placeholder="Current Weight"
        />
        <ErrorMessage name="currentWeight">
          {(msg) => (
            <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
              <ErrorIcon /> {msg}
            </span>
          )}
        </ErrorMessage>
        <Field
          id="desiredWeight"
          name="desiredWeight"
          type="text"
          className="w-39.75 h-11.5 p-3.5 border border-white/30 rounded-xl"
          placeholder="Desired Weight"
        />
        <ErrorMessage name="desiredWeight">
          {(msg) => (
            <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
              <ErrorIcon /> {msg}
            </span>
          )}
        </ErrorMessage>
        <BirthdayInput name="birthday" />
        <ErrorMessage name="birthday">
          {(msg) => (
            <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
              <ErrorIcon /> {msg}
            </span>
          )}
        </ErrorMessage>
      </div>
      <button className="flex items-center gap-2 mb-[95%]">
        Next <NextIcon />
      </button>
      <div className="flex gap-3.5">
        <div className="w-12.5 h-1 bg-orange-1 rounded"></div>
        <div className="w-12.5 h-1 bg-[#303030] rounded"></div>
        <div className="w-12.5 h-1 bg-[#303030] rounded"></div>
      </div>
    </>
  );
};

export default SecondStep;
