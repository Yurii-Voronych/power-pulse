"use client";

import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { Form, Formik } from "formik";
import type { FormikHelpers } from "formik";
import FirstStep from "./_formComponents/FirstStep";
import SecondStep from "./_formComponents/SecondStep";
import { useState } from "react";
import clsx from "clsx";
import ThirdStep from "./_formComponents/ThirdStep";
import { profileSetupSchema } from "@/lib/shared/validators/profile/editProfileSchema";
import Container from "@/components/Container";
import { parse } from "date-fns";
import Image from "next/image";
import { updateProfile } from "@/lib/client/api/userApi";
import { profileSetupSchemaServer } from "@/lib/shared/validators/profile/editProfileSchema.server";
import useAuthStore from "@/lib/client/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { ProfileDetailsFormValues } from "@/lib/shared/types/profile";
import { formatDiaryDate } from "@/lib/shared/utils/diaryDate";

export type ProfileSetupStep = 1 | 2 | 3;
export type EditProfileFormValues = ProfileDetailsFormValues;

const initialValues: EditProfileFormValues = {
  height: "",
  currentWeight: "",
  desiredWeight: "",
  birthday: "",
  sex: "",
  levelActivity: "",
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

const EditProfileForm = () => {
  const [step, setStep] = useState<ProfileSetupStep>(1);
  const steps: Array<ProfileSetupStep> = [1, 2, 3];
  const currentBg = bgImage[step];
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (
    values: EditProfileFormValues,
    actions: FormikHelpers<EditProfileFormValues>,
  ) => {
    const raw = {
      ...values,
      height: Number(values.height),
      currentWeight: Number(values.currentWeight),
      desiredWeight: Number(values.desiredWeight),
      levelActivity: Number(values.levelActivity),
      birthday: parse(values.birthday, "dd.MM.yyyy", new Date()),
    };

    const parsed = profileSetupSchemaServer.safeParse(raw);

    if (!parsed.success) {
      return;
    }
    try {
      const user = await updateProfile(parsed.data);
      setUser(user);
      actions.resetForm();
      router.replace(`/diary/${formatDiaryDate(new Date())}`);
    } catch {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <section className="relative max-w-360 mx-auto min-h-screen overflow-hidden">
      <Image
        src={currentBg.mobile}
        alt=""
        sizes="446px"
        fill
        priority
        className="object-contain object-[right_200px] md:hidden"
      />

      <Image
        src={currentBg.tablet}
        alt=""
        fill
        sizes="670px"
        priority
        className="hidden md:block 2xl:hidden object-contain object-[100%_200px]"
      />

      <Image
        src={currentBg.desk}
        alt=""
        fill
        sizes="670px"
        priority
        className="hidden 2xl:block object-contain object-right"
      />
      <Container className="relative z-20">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={profileSetupSchema}
        >
          {({ validateForm, errors, touched, isSubmitting, setTouched }) => (
            <Form noValidate>
              {step === 1 && (
                <FirstStep
                  setStep={setStep}
                  validateForm={validateForm}
                  errors={errors}
                  touched={touched}
                  setTouched={setTouched}
                />
              )}
              {step === 2 && (
                <SecondStep
                  setStep={setStep}
                  validateForm={validateForm}
                  errors={errors}
                  touched={touched}
                  setTouched={setTouched}
                />
              )}
              {step === 3 && (
                <ThirdStep setStep={setStep} isSubmitting={isSubmitting} />
              )}
            </Form>
          )}
        </Formik>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10 mx-auto w-full max-w-312 px-5 md:px-8 xl:px-0"
      >
        <Video
          className={clsx(
            "absolute bottom-36 left-25.25 short-viewport:hidden md:bottom-40 md:left-80.25 2xl:bottom-auto 2xl:left-[60%] 2xl:top-1/2",
            step === 2 && "max-md:hidden",
          )}
        />
        <Calories
          className={clsx(
            "absolute bottom-12 right-5 short-viewport:hidden md:bottom-14 md:right-8 2xl:bottom-auto 2xl:left-[90%] 2xl:right-auto 2xl:top-[80%]",
            step === 2 && "max-md:hidden",
          )}
        />

        <div className="absolute bottom-3 left-5 flex gap-3.5 md:left-8 xl:left-0">
          {steps.map((s) => (
            <div
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
      </div>
      <span aria-live="polite" className="sr-only">
        Step {step} of 3
      </span>
    </section>
  );
};

export default EditProfileForm;
