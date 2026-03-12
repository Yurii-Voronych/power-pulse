"use client";

import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { Form, Formik } from "formik";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { useState } from "react";
import clsx from "clsx";
import ThirdStep from "./ThirdStep";

const initialValues = {
  height: "",
  currentWeight: "",
  desiredWeight: "",
  birthday: undefined as Date | undefined,
};
const handleSubmit = (val) => {
  console.log(val);
};
const EditProfilePage = () => {
  const [step, setStep] = useState(1);
  return (
    <section className="max-w-360 min-h-screen m-auto flex justify-between relative overflow-hidden">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={loginSchema}
      >
        <Form className="ml-5 z-10">
          {step === 1 && <FirstStep setStep={setStep} />}
          {step === 2 && <SecondStep setStep={setStep} />}
          {step === 3 && <ThirdStep setStep={setStep} />}
        </Form>
      </Formik>

      <div
        className={clsx(
          "absolute top-60.25 left-18 w-111.5 h-167.25 bg-no-repeat bg-auto min-h-screen",
          step === 1 && "bg-[url('/step1_mobile.jpg')]",
          step === 2 && "bg-[url('/step2_mobile.jpg')]",
          step === 3 && "bg-[url('/step3_mobile.jpg')]",
        )}
      >
        <Video
          className={clsx(
            "absolute",
            step === 1 && "top-79.75 left-11",
            step === 2 && "top-98.5 left-25",
            step === 3 && "top-98.5 left-25",
          )}
        />
        <Calories
          className={clsx(
            "absolute",
            step === 1 && "top-113.75 left-39.75",
            step === 2 && "top-121.25 left-39.75",
            step === 3 && "top-121.25 left-39.75",
          )}
        />
      </div>
    </section>
  );
};

export default EditProfilePage;
