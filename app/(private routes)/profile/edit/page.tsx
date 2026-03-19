"use client";

import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { Form, Formik } from "formik";
import FirstStep from "./(formComponents)/FirstStep";
import SecondStep from "./(formComponents)/SecondStep";
import { useState } from "react";
import clsx from "clsx";
import ThirdStep from "./(formComponents)/ThirdStep";
import { editProfileSchema } from "@/lib/validators/profile/editSchema";
import Container from "@/components/Container";
import { parse } from "date-fns";
import Image from "next/image";

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

const bgImage = {
  1: {
    mobile: "/step1_mobile.jpg",
    tablet: "/step1_tablet.jpg",
    desk: "/step1_desk.jpg",
  },
  2: {
    mobile: "/step2_mobile.jpg",
    tablet: "/step2_tablet.jpg",
    desk: "/step2_desk.jpg",
  },
  3: {
    mobile: "/step3_mobile.jpg",
    tablet: "/step3_tablet.jpg",
    desk: "/step3_desk.jpg",
  },
};

const EditProfilePage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const steps: Array<1 | 2 | 3> = [1, 2, 3];
  const currentBg = bgImage[step];
  return (
    <section className="relative max-w-360 mx-auto min-h-screen overflow-hidden">
      <Image
        src={currentBg.mobile}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-contain object-[right_200px] md:hidden"
      />

      <Image
        src={currentBg.tablet}
        alt=""
        fill
        sizes="100vw"
        priority
        className="hidden md:block 2xl:hidden object-contain object-[100%_200px]"
      />

      <Image
        src={currentBg.desk}
        alt=""
        fill
        sizes="100vw"
        priority
        className="hidden 2xl:block object-contain object-right"
      />
      <Container className="relative z-10">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editProfileSchema}
        >
          {(formik) => (
            <Form
              className={clsx(
                step === 1 && "mb-28.75 md:mb-27.5 2xl:mb-37.25",
                step === 2 && "mb-16.75 md:mb-2.25 2xl:mb-12.5",
                step === 3 && "mb-69 md:mb-62.25 2xl:mb-71.25",
              )}
            >
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
        <Video
          className={clsx(
            step === 1 &&
              "ml-25.25 md:ml-80.25 mb-17.5 md:mb-14 2xl:absolute 2xl:left-[30%] 2xl:top-[50%]",
            step === 2 &&
              "absolute top-153.5 left-43.5 md:static md:ml-80.25  md:mb-14 2xl:absolute 2xl:left-[30%] 2xl:top-[50%]",
            step === 3 &&
              "ml-25.25 mb-6.25 md:ml-80.25  md:mb-14 2xl:absolute 2xl:left-[30%] 2xl:top-[50%]",
          )}
        />
        <Calories className="mb-4 md:mb-3 ml-auto 2xl:absolute 2xl:left-[90%] 2xl:top-[80%]" />
        <div className="flex gap-3.5 mb-3">
          {steps.map((s) => (
            <div
              onClick={() => setStep(s)}
              key={s}
              className={clsx(
                "w-12.5 h-1 rounded",
                step === s && "bg-orange",
                step > s && "bg-orange-1",
                step < s && "bg-[#303030]",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default EditProfilePage;
