import * as Yup from "yup";
export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimal length 2 symbols")
    .max(20, "Maximal length 20 symbols")
    .required("Name is required field"),
  email: Yup.string()
    .email("Incorrect email")
    .required("Email is required field"),
  password: Yup.string()
    .min(8, "Minimal length 8 symbols")
    .required("Password is required field"),
});
export type RegisterCredentials = Yup.InferType<typeof registerSchema>;
