"use client";

import Calories from "@/components/ui/Calories";
import Video from "@/components/ui/Video";
import { Form, Formik } from "formik";
import FirstStep from "./FirstStep";
const initialValues = {
  height: "",
  currentWeight: "",
  desiredWeight: "",
  birthday: "",
};
const handleSubmit = () => {};
const EditProfilePage = () => {
  return (
    <section className="max-w-360 min-h-screen m-auto flex justify-between relative overflow-hidden">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationSchema={loginSchema}
      >
        <Form className="ml-5 z-10">
          <FirstStep />
        </Form>
      </Formik>
      <div
        className="absolute top-[241px] left-18 w-[446px] h-[669px] bg-[url('/step1_mobile.jpg')] bg-no-repeat
    bg-auto min-h-screen"
      >
        <Video className="absolute top-[319px] left-11" />
        <Calories className="absolute top-[455px] left-[159px]" />
      </div>
    </section>
  );
};

export default EditProfilePage;
