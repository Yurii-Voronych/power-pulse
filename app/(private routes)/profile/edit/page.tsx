"use client";

import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { Form, Formik } from "formik";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { useState } from "react";
import clsx from "clsx";
import ThirdStep from "./ThirdStep";
import { editProfileSchema } from "@/lib/validators/profile/editSchema";
import Container from "@/components/Container";
import { parse } from "date-fns";

export interface EditProfileFormValues {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
  blood: string;
  sex: string;
  levelActivity: string;
}
const initialValues = {
  height: "",
  currentWeight: "",
  desiredWeight: "",
  birthday: "",
  blood: "",
  sex: "",
  levelActivity: "",
};
const handleSubmit = (values: EditProfileFormValues) => {
  const birthdayDate = parse(values.birthday, "dd.MM.yyyy", new Date());

  const payload = {
    ...values,
    height: Number(values.height),
    currentWeight: Number(values.currentWeight),
    desiredWeight: Number(values.desiredWeight),
    blood: Number(values.blood),
    levelActivity: Number(values.levelActivity),
    birthday: birthdayDate,
  };

  console.log(payload);
};
const EditProfilePage = () => {
  const [step, setStep] = useState(1);
  return (
    <section className="max-w-360 flex justify-between relative overflow-hidden">
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editProfileSchema}
        >
          {(formik) => (
            <Form className="relative z-10">
              {step === 1 && (
                <FirstStep
                  setStep={setStep}
                  validateForm={formik.validateForm}
                />
              )}
              {step === 2 && (
                <SecondStep
                  setStep={setStep}
                  validateForm={formik.validateForm}
                />
              )}
              {step === 3 && <ThirdStep setStep={setStep} />}
            </Form>
          )}
        </Formik>
      </Container>

      <div
        className={clsx(
          "absolute top-60.25 left-18 inset-0  bg-no-repeat bg-auto",
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
