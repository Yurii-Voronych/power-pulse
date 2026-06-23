"use client";

import { Field, Form, Formik, type FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import { ErrorIcon } from "./icons/ErrorIcon";
import { loginUser } from "@/lib/client/api/authApi";
import useAuthStore from "@/lib/client/store/authStore";
import { loginSchema } from "@/lib/shared/validators/auth/loginSchema";
import toast from "react-hot-toast";
import { formatDiaryDate } from "@/lib/shared/utils/diaryDate";
import { toFormikValidationSchema } from "zod-formik-adapter";

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
        router.replace(`/diary/${formatDiaryDate(new Date())}`);
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
        validationSchema={toFormikValidationSchema(loginSchema)}
      >
        {({ errors, isSubmitting, values, submitCount, touched }) => {
          const showEmailError =
            Boolean(errors.email && touched.email) &&
            (values.email !== initialValues.email || submitCount > 0);
          const showPasswordError =
            Boolean(errors.password && touched.password) &&
            (values.password !== initialValues.password || submitCount > 0);

          return (
            <Form className="md:w-82.5" noValidate>
              <div className="relative mb-4.5">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={showEmailError}
                  aria-describedby={showEmailError ? "email-error" : undefined}
                  className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors hover:bg-white/7 ${
                    showEmailError
                      ? "border-[#d80027] focus:border-[#d80027]"
                      : "border-white/30 focus:border-orange"
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
                >
                  Email
                </label>
                {showEmailError && (
                  <span
                    id="email-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-12 mt-1 flex gap-1"
                  >
                    <ErrorIcon /> {errors.email}
                  </span>
                )}
              </div>

              <div className="relative mb-4.5">
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={showPasswordError}
                  aria-describedby={
                    showPasswordError ? "password-error" : undefined
                  }
                  className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors hover:bg-white/7 ${
                    showPasswordError
                      ? "border-[#d80027] focus:border-[#d80027]"
                      : "border-white/30 focus:border-orange"
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
                >
                  Password
                </label>
                {showPasswordError && (
                  <span
                    id="password-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-12 mt-1 flex gap-1"
                  >
                    <ErrorIcon /> {errors.password}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary mb-3 disabled:opacity-40 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Sign-In"}
              </button>
            </Form>
          );
        }}
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
