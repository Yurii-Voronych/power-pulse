"use client";

import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { Form, Formik } from "formik";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
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
  return (
    <section className="max-w-360 min-h-screen m-auto flex justify-between relative overflow-hidden">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={loginSchema}
      >
        <Form className="ml-5 z-10">
          {/* <FirstStep /> */}
          <SecondStep />
        </Form>
      </Formik>
      <div
        className="absolute top-60.25 left-18 w-111.5 h-167.25 bg-[url('/step1_mobile.jpg')] bg-no-repeat
    bg-auto min-h-screen"
      >
        <Video className="absolute top-79.75 left-11" />
        <Calories className="absolute top-113.75 left-39.75" />
      </div>
    </section>
  );
};

export default EditProfilePage;
