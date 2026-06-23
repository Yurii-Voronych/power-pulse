"use client";
import { AxiosError } from "axios";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorIcon } from "./icons/ErrorIcon";
import { registerUser } from "@/lib/client/api/authApi";
import useAuthStore from "@/lib/client/store/authStore";
import { registerSchema } from "@/lib/shared/validators/auth/registerSchema";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";

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
      router.replace("/profile/edit");
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
      <p className="text-[14px] md:text-[16px] leading-[1.29] md:leading-normal text-white/30 mb-7 md:mb-8 md:w-124">
        Thank you for your interest in our platform. To complete the
        registration process, please provide us with the following information.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={toFormikValidationSchema(registerSchema)}
      >
        {({ errors, isSubmitting, values, submitCount, touched }) => {
          const showNameError =
            Boolean(errors.name && touched.name) &&
            (values.name !== initialValues.name || submitCount > 0);
          const showEmailError =
            Boolean(errors.email && touched.email) &&
            (values.email !== initialValues.email || submitCount > 0);
          const showPasswordError =
            Boolean(errors.password && touched.password) &&
            (values.password !== initialValues.password || submitCount > 0);

          return (
            <Form className="flex flex-col md:w-82.5" noValidate>
              <div className="relative mb-4.5">
                <Field
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={showNameError}
                  aria-describedby={showNameError ? "name-error" : undefined}
                  className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors hover:bg-white/7 ${
                    showNameError
                      ? "border-[#d80027] focus:border-[#d80027]"
                      : "border-white/30 focus:border-orange"
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
                >
                  Name
                </label>

                {showNameError && (
                  <span
                    id="name-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-12 mt-1 flex gap-1"
                  >
                    <ErrorIcon /> {errors.name}
                  </span>
                )}
              </div>
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
                  autoComplete="new-password"
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
                disabled={isSubmitting}
                type="submit"
                className="btn-primary mb-3 disabled:opacity-40"
              >
                {isSubmitting ? "Loading..." : "Sign-up"}
              </button>
            </Form>
          );
        }}
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
