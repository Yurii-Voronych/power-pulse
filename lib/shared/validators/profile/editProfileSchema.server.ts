import { z } from "zod";
import { differenceInYears } from "date-fns";
import {
  ACTIVITY_LEVEL_VALUES,
  MAX_HEIGHT,
  MAX_WEIGHT,
  MIN_AGE,
  MIN_HEIGHT,
  MIN_WEIGHT,
  SEX_OPTIONS,
} from "@/lib/shared/constants/constants";

const profileDetailsSchemaServer = z.object({
  height: z
    .number()
    .min(MIN_HEIGHT, `Minimum height is ${MIN_HEIGHT} cm`)
    .max(MAX_HEIGHT, `Maximum height is ${MAX_HEIGHT}`),

  currentWeight: z
    .number()
    .min(MIN_WEIGHT, `Minimum weight is ${MIN_WEIGHT} kg`)
    .max(MAX_WEIGHT, `Maximum weight is ${MAX_WEIGHT} kg`),

  desiredWeight: z
    .number()
    .min(MIN_WEIGHT, `Minimum weight is ${MIN_WEIGHT} kg`)
    .max(MAX_WEIGHT, `Maximum weight is ${MAX_WEIGHT} kg`),

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
});

export const profileSetupSchemaServer = profileDetailsSchemaServer;

export const profileSettingsSchemaServer = profileDetailsSchemaServer.extend({
  email: z.email("Incorrect email").trim().toLowerCase(),
  name: z
    .string()
    .trim()
    .min(2, "Minimal length 2 symbols")
    .max(20, "Maximal length 20 symbols"),
});

export const profileUpdateSchemaServer = profileDetailsSchemaServer
  .extend({
    email: z.email("Incorrect email").optional(),
    name: z
      .string()
      .trim()
      .min(2, "Minimal length 2 symbols")
      .max(20, "Maximal length 20 symbols")
      .optional(),
  })
  .refine(
    (data) =>
      (data.name === undefined && data.email === undefined) ||
      (data.name !== undefined && data.email !== undefined),
    {
      message: "Name and email must be provided together",
      path: ["name"],
    },
  );

export type ProfileInput = z.infer<typeof profileUpdateSchemaServer>;
