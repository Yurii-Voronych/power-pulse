import { z } from "zod";

export const loginSchemaServer = z.object({
  email: z.email("Incorrect email"),
  password: z.string().min(8, "Minimal length 8 symbols"),
  name: z
    .string()
    .min(2, "Minimal length 2 symbols")
    .max(20, "Maximal length 20 symbols"),
});
