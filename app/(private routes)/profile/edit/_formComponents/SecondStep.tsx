import { Field, FormikErrors } from "formik";
import { NextIcon } from "@/components/icons/NextArrowIcon";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { EditProfileFormValues } from "../EditProfileForm";

interface SecondStepProps {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  validateForm: () => Promise<FormikErrors<EditProfileFormValues>>;
}
const SecondStep = ({ setStep, validateForm }: SecondStepProps) => {
  const handleClick = async () => {
    const errors = await validateForm();
    if (!errors.sex && !errors.levelActivity) {
      setStep(3);
    } else {
      console.log(errors);
      toast.error("Please, fill all form fields");
    }
  };
  return (
    <>
      <p className="text-2xl leading-[1.67] md:text-[32px] md:leading-[1.38] font-bold pt-31.75 2xl:pt-50 mb-7">
        Get Closer To Your Goals
      </p>
      <div className="grid grid-cols-2 gap-3.5  2xl:w-48.75 mb-7 text-white text-[14px] leading-[1.28]">
        <div className="text-white text-[14px]">
          <p className="mb-4">Sex:</p>
          <div className="space-y-2">
            {["male", "female"].map((sex) => (
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
          </div>
        </div>
      </div>
      <div className="text-white text-[14px] mb-7 leading-[1.28]">
        <p className="mb-3.5 ">Level Activity:</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Field
              type="radio"
              name="levelActivity"
              value="1"
              className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
            />
            <span>Sedentary lifestyle (little or no physical activity)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <Field
              type="radio"
              name="levelActivity"
              value="2"
              className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
            />
            <span>
              Light activity (light exercises/sports 1-3 days per week)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <Field
              type="radio"
              name="levelActivity"
              value="3"
              className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
            />
            <span>
              Moderately active (moderate exercises/sports 3-5 days per week)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <Field
              type="radio"
              name="levelActivity"
              value="4"
              className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
            />
            <span>
              Very active (intense exercises/sports 6-7 days per week)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <Field
              type="radio"
              name="levelActivity"
              value="5"
              className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
            />
            <span>
              Extremely active (very strenuous exercises/sports and physical
              work)
            </span>
          </label>
        </div>
      </div>
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
