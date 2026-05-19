import { z } from "zod";

export const loginSchemaServer = z.object({
  email: z.email("Incorrect email"),
  password: z.string().min(8, "Minimal length 8 symbols"),
});
