"use client";
import { AxiosError } from "axios";
import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { ErrorIcon } from "./icons/ErrorIcon";
import { register } from "@/lib/api/api";

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: RegistrationValues = { name: "", email: "", password: "" };

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimal length 2 symbols")
    .max(20, "Maximal length 20 symbols")
    .required("Required field"),
  email: Yup.string().email("Incorrect email").required("Required field"),
  password: Yup.string()
    .min(8, "Minimal length 8 symbols")
    .required("Required field"),
});

const RegistrationForm = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: RegistrationValues,
    actions: FormikHelpers<RegistrationValues>,
  ) => {
    try {
      await register(values);
      actions.resetForm();
      // router.push("/profile/edit");
    } catch (error) {
      if ((error as AxiosError).status === 409) {
        alert("Email is already in use");
      } else {
        alert("Something went wrong try again later");
      }
    }
  };
  return (
    <>
      <h1 className="text-2xl md:text-[32px] leading-[1.66] md:leading-[1.38] font-bold mb-3.5">
        Sign Up
      </h1>
      <p className="text-[14px] md:text-[16px] leading- [1.29] md:leading-normal  text-white/30 mb-7 md:mb-8 md:w-124">
        Thank you for your interest in our platform. To complete the
        registration process, please provide us with the following information.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Schema}
      >
        {({ isValid, dirty }) => (
          <Form className="flex flex-col">
            <div className="relative">
              <Field
                id="title"
                type="text"
                name="name"
                className="form-input mb-4.5 "
                placeholder="Name"
              />
              <ErrorMessage name="name">
                {(msg) => (
                  <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                    <ErrorIcon /> {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
            <div className="relative">
              <Field
                id="email"
                name="email"
                type="text"
                className="form-input mb-4.5"
                placeholder="Email"
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                    <ErrorIcon /> {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
            <div className="relative">
              <Field
                id="password"
                name="password"
                type="password"
                className="form-input mb-7 md:mb-16"
                placeholder="Password"
              />
              <ErrorMessage name="password">
                {(msg) => (
                  <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1 justify-center">
                    <ErrorIcon /> {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>

            <button type="submit" className="btn-primary mb-3">
              Sign-up
            </button>
          </Form>
        )}
      </Formik>
      <p className="inline-block mr-1 text-[12px] text-white/60 leading-normal mb-15.25 md:mb-9.75 2xl:mb-0">
        Already have account?
      </p>
      <Link
        href={"/auth/login"}
        className="text-[12px] text-white leading-normal underline "
      >
        Sign in
      </Link>
    </>
  );
};

export default RegistrationForm;
