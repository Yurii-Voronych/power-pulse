import * as Yup from "yup";
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Incorrect email")
    .required("Email is required field"),
  password: Yup.string()
    .min(8, "Minimal length 8 symbols")
    .required("Password is required field"),
});
export type LoginCredentials = Yup.InferType<typeof loginSchema>;
