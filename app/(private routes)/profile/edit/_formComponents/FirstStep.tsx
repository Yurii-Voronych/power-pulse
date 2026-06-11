import { ErrorIcon } from "@/components/icons/ErrorIcon";
import { ErrorMessage, Field, FormikErrors, FormikTouched } from "formik";

import { NextIcon } from "@/components/icons/NextArrowIcon";
import { Dispatch, SetStateAction } from "react";
import { EditProfileFormValues } from "../EditProfileForm";
import BirthdayInput from "./BirthdayInput";

interface FirstStepProps {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  validateForm: () => Promise<FormikErrors<EditProfileFormValues>>;
  errors: FormikErrors<EditProfileFormValues>;
  touched: FormikTouched<EditProfileFormValues>;
  setTouched: (
    touched: FormikTouched<EditProfileFormValues>,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<EditProfileFormValues>>;
}

const FirstStep = ({
  setStep,
  validateForm,
  errors,
  touched,
  setTouched,
}: FirstStepProps) => {
  const handleNext = async () => {
    await setTouched(
      {
        height: true,
        currentWeight: true,
        desiredWeight: true,
        birthday: true,
      },
      false,
    );

    const errors = await validateForm();

    const hasErrors =
      errors.height ||
      errors.currentWeight ||
      errors.desiredWeight ||
      errors.birthday;

    if (!hasErrors) {
      setStep(2);
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
            inputMode="decimal"
            aria-invalid={Boolean(touched.height && errors.height)}
            aria-describedby={
              touched.height && errors.height ? "height-error" : undefined
            }
            className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors ${
              Boolean(touched.height && errors.height)
                ? "border-[#d80027] focus:border-[#d80027]"
                : "border-white/30 focus:border-orange"
            }`}
            placeholder=" "
          />

          <label
            htmlFor="height"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
          >
            Height
          </label>

          <ErrorMessage name="height">
            {(msg) => (
              <span
                id="height-error"
                className="absolute -bottom-5.5 left-0 flex gap-1 text-xs leading-normal text-[#d80027]"
              >
                <ErrorIcon />
                {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div className="relative">
          <Field
            id="currentWeight"
            name="currentWeight"
            type="text"
            inputMode="decimal"
            aria-invalid={Boolean(
              touched.currentWeight && errors.currentWeight,
            )}
            aria-describedby={
              touched.currentWeight && errors.currentWeight
                ? "current-weight-error"
                : undefined
            }
            className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors ${
              Boolean(touched.currentWeight && errors.currentWeight)
                ? "border-[#d80027] focus:border-[#d80027]"
                : "border-white/30 focus:border-orange"
            }`}
            placeholder=" "
          />
          <label
            htmlFor="currentWeight"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
          >
            Current Weight
          </label>

          <ErrorMessage name="currentWeight">
            {(msg) => (
              <span
                id="current-weight-error"
                className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1"
              >
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
            inputMode="decimal"
            aria-invalid={Boolean(
              touched.desiredWeight && errors.desiredWeight,
            )}
            aria-describedby={
              touched.desiredWeight && errors.desiredWeight
                ? "desired-weight-error"
                : undefined
            }
            className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors ${
              Boolean(touched.desiredWeight && errors.desiredWeight)
                ? "border-[#d80027] focus:border-[#d80027]"
                : "border-white/30 focus:border-orange"
            }`}
            placeholder=" "
          />
          <label
            htmlFor="desiredWeight"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
          >
            Desired Weight
          </label>
          <ErrorMessage name="desiredWeight">
            {(msg) => (
              <span
                id="desired-weight-error"
                className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1"
              >
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div className="relative">
          <BirthdayInput
            name="birthday"
            error={errors.birthday}
            touched={touched.birthday}
          />
          <ErrorMessage name="birthday">
            {(msg) => (
              <span
                id="birthday-error"
                className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1"
              >
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
      </div>
      <button
        className="flex items-center gap-2"
        onClick={handleNext}
        type="button"
      >
        Next <NextIcon />
      </button>
    </>
  );
};

export default FirstStep;
