"use client";
import { AxiosError } from "axios";
import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorIcon } from "./icons/ErrorIcon";
import { registerUser } from "@/lib/client/api/authApi";
import useAuthStore from "@/lib/client/store/authStore";
import { registerSchema } from "@/lib/shared/validators/auth/registerSchema";
import toast from "react-hot-toast";
import { useState } from "react";

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: RegistrationValues = { name: "", email: "", password: "" };

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (
    values: RegistrationValues,
    actions: FormikHelpers<RegistrationValues>,
  ) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
        {({ errors, touched }) => (
          <Form className="flex flex-col md:w-82.5">
            <div className="relative">
              <Field
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                className={`peer form-input mb-4.5 max-md:w-full ${
                  touched.name && errors.name ? "border-[#d80027]" : ""
                }`}
              />

              <label
                htmlFor="name"
                className="
                  absolute -top-5 left-0
                  text-[14px] text-white/70
                  opacity-100 transition-opacity
                  peer-placeholder-shown:pointer-events-none
                  peer-placeholder-shown:opacity-0
                  "
              >
                Name
              </label>

              <ErrorMessage name="name">
                {(msg) => (
                  <span className="absolute right-0 top-12 flex gap-1 text-xs leading-normal text-[#d80027] md:top-13.5">
                    <ErrorIcon />
                    {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
            <div className="relative">
              <Field
                id="email"
                name="email"
                type="text"
                className={`peer form-input mb-4.5 max-md:w-full ${
                  touched.email && errors.email ? "border-[#d80027]" : ""
                }`}
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="
                  absolute -top-5 left-0
                  text-[14px] text-white/70
                  opacity-100 transition-opacity
                  peer-placeholder-shown:pointer-events-none
                  peer-placeholder-shown:opacity-0
                  "
              >
                Email
              </label>
              <ErrorMessage name="email">
                {(msg) => (
                  <span className="text-[12px] text-[#d80027] leading-normal absolute right-0 top-12 flex gap-1 md:top-13.5">
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
                className={`peer form-input mb-4.5 max-md:w-full ${
                  touched.password && errors.password ? "border-[#d80027]" : ""
                }`}
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="
                  absolute -top-5 left-0
                  text-[14px] text-white/70
                  opacity-100 transition-opacity
                  peer-placeholder-shown:pointer-events-none
                  peer-placeholder-shown:opacity-0
                  "
              >
                Password
              </label>
              <ErrorMessage name="password">
                {(msg) => (
                  <span className="text-[12px] text-[#d80027] leading-normal absolute right-0 top-12 flex gap-1 justify-center md:top-13.5">
                    <ErrorIcon /> {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn-primary mb-3 md:w-60 2xl:w-full"
            >
              {isLoading ? "Loading..." : "Sign-up"}
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
