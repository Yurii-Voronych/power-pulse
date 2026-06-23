import { z } from "zod/v4";

const requiredString = (message: string) =>
  z.preprocess((value) => value ?? "", z.string().min(1, message));

export const registerSchema = z.object({
  name: requiredString("Name is required field").pipe(
    z
      .string()
      .min(2, "Minimal length 2 symbols")
      .max(20, "Maximal length 20 symbols"),
  ),
  email: requiredString("Email is required field").pipe(
    z.email("Incorrect email"),
  ),
  password: requiredString("Password is required field").pipe(
    z.string().min(8, "Minimal length 8 symbols"),
  ),
});

export type RegisterCredentials = z.infer<typeof registerSchema>;
