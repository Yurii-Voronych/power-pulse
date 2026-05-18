"use client";
import { AxiosError } from "axios";
import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorIcon } from "./icons/ErrorIcon";
import { registerUser } from "@/lib/client/api/authApi";
import useAuthStore from "@/lib/client/store/authStore";
import { registerSchema } from "@/lib/validators/auth/registerSchema";
import toast from "react-hot-toast";

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: RegistrationValues = { name: "", email: "", password: "" };

const RegistrationForm = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (
    values: RegistrationValues,
    actions: FormikHelpers<RegistrationValues>,
  ) => {
    try {
      const user = await registerUser(values);
      setUser(user);
      actions.resetForm();
      router.push("/profile/edit");
      router.refresh();
    } catch (error) {
      if ((error as AxiosError).status === 409) {
        toast.error("Email is already in use");
      } else {
        toast.error("Something went wrong try again later");
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
        validationSchema={registerSchema}
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
      <p className="inline-block mr-1 text-[12px] text-white/60 leading-normal">
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
