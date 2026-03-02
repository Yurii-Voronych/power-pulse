"use client";
import { AxiosError } from "axios";
import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from "formik";

import Link from "next/link";
import { useRouter } from "next/navigation";

import * as Yup from "yup";

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: RegistrationValues = { name: "", email: "", password: "" };

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Мінімальна довжина 2 символи")
    .max(20, "Максимальна довжина 20 символів")
    .required("Обов'язкове поле"),
  email: Yup.string().email("Некоректний email").required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Обов'язкове поле"),
});

const RegistrationForm = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: RegistrationValues,
    actions: FormikHelpers<RegistrationValues>,
  ) => {
    try {
      // await register(values);
      actions.resetForm();
      router.push("/profile/edit");
    } catch (error) {
      if ((error as AxiosError).status === 409) {
        alert("Email уже використовується");
      } else {
        alert("Щось пішло не так, спробйте пізніше");
      }
    }
  };
  return (
    <>
      <h1 className="text-2xl leading-[1.66] font-bold mb-3.5">Sign Up</h1>
      <p className="text-[14px] leading- [1.29] text-white/30 mb-7">
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
            <Field
              id="title"
              type="text"
              name="name"
              className="form-input mb-4.5"
              placeholder="Name"
            />
            <ErrorMessage name="name">
              {(msg) => <span className="">{msg}</span>}
            </ErrorMessage>

            <Field
              id="email"
              name="email"
              type="text"
              className="form-input mb-4.5"
              placeholder="Email"
            />
            <ErrorMessage name="email">
              {(msg) => <span className="">{msg}</span>}
            </ErrorMessage>

            <Field
              id="password"
              name="password"
              type="password"
              className="form-input mb-7"
              placeholder="Password"
            />
            <ErrorMessage name="password">
              {(msg) => <span className="">{msg}</span>}
            </ErrorMessage>

            <button
              type="submit"
              disabled={!isValid || !dirty}
              className="btn-primary"
            >
              Sign-up
            </button>
          </Form>
        )}
      </Formik>
      <p className=""> Вже маєте акаунт?</p>
      <Link href={"/auth/login"} className="">
        Увійти
      </Link>
    </>
  );
};

export default RegistrationForm;
