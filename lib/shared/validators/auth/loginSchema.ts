import { z } from "zod/v4";

const requiredString = (message: string) =>
  z.preprocess((value) => value ?? "", z.string().min(1, message));

export const loginSchema = z.object({
  email: requiredString("Email is required field").pipe(
    z.email("Incorrect email"),
  ),
  password: requiredString("Password is required field").pipe(
    z.string().min(8, "Minimal length 8 symbols"),
  ),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
