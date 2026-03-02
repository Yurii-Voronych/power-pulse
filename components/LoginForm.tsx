"use client";

import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Link from "next/link";

import { AxiosError } from "axios";

interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = { email: "", password: "" };

const Schema = Yup.object().shape({
  email: Yup.string().email("Некоректний email").required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Обов'язкове поле"),
});

const LoginForm = () => {
  const router = useRouter();
  const handleSubmit = async (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>,
  ) => {
    try {
      actions.resetForm();
      router.push("/");
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        alert("Логін або пароль не вірний");
      } else {
        alert("Щось пішло не так, спробйте пізніше");
      }
    }
  };
  return (
    <div>
      <h1 className="">Вхід</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Schema}
      >
        {({ isValid, dirty }) => (
          <Form className="">
            <div className="">
              <label htmlFor="email" className="">
                Пошта
              </label>
              <Field
                id="email"
                name="email"
                type="text"
                className=""
                placeholder="Пошта"
              />
              <ErrorMessage name="email">
                {(msg) => <span className="">{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="">
              <label htmlFor="password" className="">
                Пароль
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Пароль"
              />
              <ErrorMessage name="password">
                {(msg) => <span className="">{msg}</span>}
              </ErrorMessage>
            </div>

            <button type="submit" disabled={!isValid || !dirty} className="">
              Увійти
            </button>
            <p className=""> Немає аккаунту?</p>
            <Link href={"/auth/register"} className="">
              Зареєструватися
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
