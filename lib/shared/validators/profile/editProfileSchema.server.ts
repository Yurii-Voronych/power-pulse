import { z } from "zod";
import { differenceInYears } from "date-fns";
import {
  ACTIVITY_LEVEL_VALUES,
  MIN_AGE,
  MIN_HEIGHT,
  MIN_WEIGHT,
  SEX_OPTIONS,
} from "@/lib/shared/constants/constants";

export const editProfileSchemaServer = z.object({
  height: z
    .number()
    .min(MIN_HEIGHT, `Minimum height is ${MIN_HEIGHT} cm`),

  currentWeight: z
    .number()
    .min(MIN_WEIGHT, `Minimum weight is ${MIN_WEIGHT} kg`),

  desiredWeight: z
    .number()
    .min(MIN_WEIGHT, `Minimum weight is ${MIN_WEIGHT} kg`),

  birthday: z.coerce
    .date()
    .refine(
      (date) => differenceInYears(new Date(), date) >= MIN_AGE,
      `You must be at least ${MIN_AGE} years old`,
    ),

  sex: z.enum(SEX_OPTIONS),

  levelActivity: z.union([
    z.literal(ACTIVITY_LEVEL_VALUES[0]),
    z.literal(ACTIVITY_LEVEL_VALUES[1]),
    z.literal(ACTIVITY_LEVEL_VALUES[2]),
    z.literal(ACTIVITY_LEVEL_VALUES[3]),
    z.literal(ACTIVITY_LEVEL_VALUES[4]),
  ]),
  email: z.email("Incorrect email").optional(),
  name: z
    .string()
    .min(2, "Minimal length 2 symbols")
    .max(20, "Maximal length 20 symbols")
    .optional(),
});
export type ProfileInput = z.infer<typeof editProfileSchemaServer>;
