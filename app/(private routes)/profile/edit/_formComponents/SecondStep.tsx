import { ErrorMessage, Field } from "formik";
import type { FormikErrors, FormikTouched } from "formik";
import { NextIcon } from "@/components/icons/NextArrowIcon";
import type { Dispatch, SetStateAction } from "react";
import type {
  EditProfileFormValues,
  ProfileSetupStep,
} from "../EditProfileForm";
import { ErrorIcon } from "@/components/icons/ErrorIcon";
import {
  ACTIVITY_LEVELS,
  SEX_OPTIONS,
} from "@/lib/shared/constants/constants";

interface SecondStepProps {
  setStep: Dispatch<SetStateAction<ProfileSetupStep>>;
  validateForm: () => Promise<FormikErrors<EditProfileFormValues>>;
  errors: FormikErrors<EditProfileFormValues>;
  touched: FormikTouched<EditProfileFormValues>;
  setTouched: (
    touched: FormikTouched<EditProfileFormValues>,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<EditProfileFormValues>>;
}
const SecondStep = ({
  setStep,
  validateForm,
  errors,
  touched,
  setTouched,
}: SecondStepProps) => {
  const handleClick = async () => {
    await setTouched(
      {
        sex: true,
        levelActivity: true,
      },
      false,
    );
    const errors = await validateForm();
    if (!errors.sex && !errors.levelActivity) {
      setStep(3);
    }
  };
  return (
    <>
      <h1 className="text-2xl leading-[1.67] md:text-[32px] md:leading-[1.38] font-bold pt-31.75 2xl:pt-50 mb-7">
        Get Closer To Your Goals
      </h1>
      <div className="2xl:w-48.75 mb-7 text-white text-[14px] leading-[1.28]">
        <fieldset
          aria-invalid={Boolean(touched.sex && errors.sex)}
          aria-describedby={touched.sex && errors.sex ? "sex-error" : undefined}
          className="text-white text-[14px]"
        >
          <legend className="mb-4">Sex:</legend>
          <div className="space-y-2">
            {SEX_OPTIONS.map((sex) => (
              <label
                key={sex}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Field
                  type="radio"
                  name="sex"
                  value={sex}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1"
                />

                <span className="capitalize">{sex}</span>
              </label>
            ))}
            <div className="min-h-4">
              <ErrorMessage name="sex">
                {(msg) => (
                  <span
                    id="sex-error"
                    className="flex gap-1 text-xs text-[#d80027]"
                  >
                    <ErrorIcon />
                    {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
          </div>
        </fieldset>
      </div>
      <fieldset
        aria-invalid={Boolean(touched.levelActivity && errors.levelActivity)}
        aria-describedby={
          touched.levelActivity && errors.levelActivity
            ? "level-activity-error"
            : undefined
        }
        className="text-white text-[14px] mb-7 leading-[1.28]"
      >
        <legend className="mb-3.5 ">Level Activity:</legend>
        <div className="space-y-2">
          {ACTIVITY_LEVELS.map((a) => (
            <label
              className="flex items-center gap-2 cursor-pointer"
              key={a.value}
            >
              <Field
                type="radio"
                name="levelActivity"
                value={String(a.value)}
                className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
              />
              <span>{a.label}</span>
            </label>
          ))}
          <div className="min-h-4">
            <ErrorMessage name="levelActivity">
              {(msg) => (
                <span
                  id="level-activity-error"
                  className="flex gap-1 text-xs text-[#d80027]"
                >
                  <ErrorIcon />
                  {msg}
                </span>
              )}
            </ErrorMessage>
          </div>
        </div>
      </fieldset>
      <div className="flex gap-4 w-fit">
        <button
          className="flex items-center gap-2"
          type="button"
          onClick={() => {
            setStep(1);
          }}
        >
          <NextIcon className="rotate-180" />
          Back
        </button>
        <button
          className="flex items-center gap-2"
          type="button"
          onClick={handleClick}
        >
          Next <NextIcon />
        </button>
      </div>
    </>
  );
};

export default SecondStep;
