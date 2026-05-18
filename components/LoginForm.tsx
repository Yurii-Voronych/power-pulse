"use client";

import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import { ErrorIcon } from "./icons/ErrorIcon";
import { loginUser } from "@/lib/client/api/authApi";
import useAuthStore from "@/lib/client/store/authStore";
import { loginSchema } from "@/lib/validators/auth/loginSchema";
import toast from "react-hot-toast";

interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = { email: "", password: "" };

const LoginForm = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const handleSubmit = async (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>,
  ) => {
    try {
      const user = await loginUser(values);
      setUser(user);
      actions.resetForm();
      if (!user.isProfileCompleted) {
        router.replace("/profile/edit");
      } else {
        router.replace("/diary");
      }
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Something went wrong try again later");
      }
    }
  };
  return (
    <>
      <h1 className="text-2xl md:text-[32px] leading-[1.66] md:leading-[1.38] font-bold mb-3.5">
        Sign in
      </h1>
      <p className="text-[14px] md:text-[16px] leading-[1.29] md:leading-normal text-white/30 mb-7">
        Welcome! Please enter your credentials to login to the platform:
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ isValid, dirty }) => (
          <Form className="">
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
                className="form-input mb-7"
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
              Sign-In
            </button>
          </Form>
        )}
      </Formik>
      <p className="inline-block mr-1 text-[12px] text-white/60 leading-normal ">
        Don’t have an account?
      </p>
      <Link
        href={"/auth/register"}
        className="text-[12px] text-white leading-normal underline "
      >
        Sign Up
      </Link>
    </>
  );
};

export default LoginForm;
