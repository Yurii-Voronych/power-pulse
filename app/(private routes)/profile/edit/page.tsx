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
    tablet: "/step2_mobile.jpg",
    desk: "/step2_mobile.jpg",
  },
  3: {
    mobile: "/step3_mobile.jpg",
    tablet: "/step3_mobile.jpg",
    desk: "/step3_mobile.jpg",
  },
};

const EditProfilePage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const currentBg = bgImage[step];

  return (
    <section className="relative max-w-360 m-auto h-screen overflow-hidden flex justify-between">
      <div className="absolute  w-[446px] h-[669px] top-[241px]">
        <Image
          src={currentBg.mobile}
          alt=""
          fill
          priority
          className="object-contain md:hidden"
        />
        <Image
          src={currentBg.tablet}
          alt=""
          fill
          className="hidden md:block 2xl:hidden"
          priority
        />
        <Image
          src={currentBg.desk}
          alt=""
          fill
          className=" hidden 2xl:block"
          priority
        />
        <Video
          className={clsx(
            "absolute",
            step === 1 && "top-0 left-0",
            step === 2 && "top-124 left-65 md:top-111 md:left-75",
            step === 3 && "top-98.5 left-25",
          )}
        />
        {/* <Calories
          className={clsx(
            "absolute",
            step === 1 &&
              "top-135.25 left-77 md:top-169.25 md:left-114 2xl:top-133",
            step === 2 && "top-140 left-77 md:top-150 md:left-114",
            step === 3 && "top-121.25 left-39.75",
          )}
        /> */}
      </div>

      <Container className="relative z-10">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editProfileSchema}
        >
          {(formik) => (
            <Form>
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
    </section>
  );
};

export default EditProfilePage;
