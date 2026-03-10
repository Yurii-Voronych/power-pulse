import { ErrorIcon } from "@/components/icons/ErrorIcon";
import { ErrorMessage, Field } from "formik";

const FirstStep = () => {
  return (
    <>
      <h1 className="text-2xl leading-[1.66] font-bold mt-[127px] mb-3.5">
        Get Closer To Your Goals
      </h1>
      <p className="text-[14px] leading-[1.29] mb-7 text-white/30 w-[335px]">
        To ensure a personalized user experience and the proper functioning of
        our platform, we ask you to provide the following information about your
        weight, height and other relevant data:
      </p>
      <div className="grid grid-cols-2 gap-3.5">
        <Field
          id="height"
          name="height"
          type="text"
          className="w-[159px] h-11.5 p-3.5 border border-white/30 rounded-xl"
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
          className="w-[159px] h-11.5 p-3.5 border border-white/30 rounded-xl"
          placeholder="Current Weight"
        />
        <ErrorMessage name="email">
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
          className="w-[159px] h-11.5 p-3.5 border border-white/30 rounded-xl"
          placeholder="Desired Weight"
        />
        <ErrorMessage name="email">
          {(msg) => (
            <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
              <ErrorIcon /> {msg}
            </span>
          )}
        </ErrorMessage>
      </div>
    </>
  );
};

export default FirstStep;
