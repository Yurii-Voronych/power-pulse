"use client";

import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import { ErrorIcon } from "./icons/ErrorIcon";
import { loginUser } from "@/lib/client/api/authApi";
import useAuthStore from "@/lib/client/store/authStore";
import { loginSchema } from "@/lib/shared/validators/auth/loginSchema";
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
        {({ errors, touched, isSubmitting }) => (
          <Form className="md:w-82.5" noValidate>
            <div className="relative">
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={
                  touched.email && errors.email ? "login-email-error" : undefined
                }
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
                  <span
                    id="login-email-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute right-0 top-12 flex gap-1 md:top-13.5"
                  >
                    <span aria-hidden="true">
                      <ErrorIcon />
                    </span>
                    {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>

            <div className="relative">
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={Boolean(touched.password && errors.password)}
                aria-describedby={
                  touched.password && errors.password
                    ? "login-password-error"
                    : undefined
                }
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
                  <span
                    id="login-password-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute right-0 top-12 flex gap-1 justify-center md:top-13.5"
                  >
                    <span aria-hidden="true">
                      <ErrorIcon />
                    </span>
                    {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>

            <button
              type="submit"
              className="btn-primary mb-3 disabled:opacity-40 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Sign-In"}
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
