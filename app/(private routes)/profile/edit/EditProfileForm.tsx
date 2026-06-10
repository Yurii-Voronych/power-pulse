"use client";

import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { Form, Formik, FormikHelpers } from "formik";
import FirstStep from "./_formComponents/FirstStep";
import SecondStep from "./_formComponents/SecondStep";
import { useState } from "react";
import clsx from "clsx";
import ThirdStep from "./_formComponents/ThirdStep";
import { editProfileSchema } from "@/lib/shared/validators/profile/editProfileSchema";
import Container from "@/components/Container";
import { parse } from "date-fns";
import Image from "next/image";
import { updateProfile } from "@/lib/client/api/userApi";
import { editProfileSchemaServer } from "@/lib/shared/validators/profile/editProfileSchema.server";
import useAuthStore from "@/lib/client/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface EditProfileFormValues {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
  sex: string;
  levelActivity: string;
}

const initialValues = {
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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const steps: Array<1 | 2 | 3> = [1, 2, 3];
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

    const parsed = editProfileSchemaServer.safeParse(raw);

    if (!parsed.success) {
      return;
    }
    try {
      const user = await updateProfile(parsed.data);
      setUser(user);
      actions.resetForm();
      router.replace("/diary");
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
      <Container className="relative z-10">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editProfileSchema}
        >
          {({ validateForm, errors, touched, isSubmitting, setTouched }) => (
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
                  validateForm={validateForm}
                  errors={errors}
                  touched={touched}
                  setTouched={setTouched}
                />
              )}
              {step === 2 && (
                <SecondStep setStep={setStep} validateForm={validateForm} />
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

export default EditProfileForm;
