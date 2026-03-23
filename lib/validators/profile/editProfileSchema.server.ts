import { z } from "zod";
import { differenceInYears } from "date-fns";

export const editProfileSchemaServer = z.object({
  height: z.number().min(150, "Minimum height is 150 cm"),

  currentWeight: z.number().min(35, "Minimum weight is 35 kg"),

  desiredWeight: z.number().min(35, "Minimum weight is 35 kg"),

  birthday: z.coerce
    .date()
    .refine(
      (date) => differenceInYears(new Date(), date) >= 18,
      "You must be at least 18 years old",
    ),

  blood: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),

  sex: z.enum(["male", "female"]),

  levelActivity: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  email: z.email("Incorrect email").optional(),
  name: z
    .string()
    .min(2, "Minimal length 2 symbols")
    .max(20, "Maximal length 20 symbols")
    .optional(),
});
export type ProfileInput = z.infer<typeof editProfileSchemaServer>;
