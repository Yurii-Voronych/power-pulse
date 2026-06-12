import * as Yup from "yup";
import { parse, isValid, subYears } from "date-fns";
import {
  ACTIVITY_LEVEL_VALUES,
  MAX_HEIGHT,
  MAX_WEIGHT,
  MIN_AGE,
  MIN_HEIGHT,
  MIN_WEIGHT,
  SEX_OPTIONS,
} from "@/lib/shared/constants/constants";

const profileDetailsSchema = Yup.object({
  height: Yup.number()
    .typeError("Height must be a number")
    .min(MIN_HEIGHT, `Minimum height is ${MIN_HEIGHT} cm`)
    .max(MAX_HEIGHT, `Maximum height is ${MAX_HEIGHT}`)
    .required("Height is required"),

  currentWeight: Yup.number()
    .typeError("Current weight must be a number")
    .min(MIN_WEIGHT, `Minimum weight is ${MIN_WEIGHT} kg`)
    .max(MAX_WEIGHT, `Maximum weight is ${MAX_WEIGHT} kg`)
    .required("Current weight is required"),

  desiredWeight: Yup.number()
    .typeError("Desired weight must be a number")
    .min(MIN_WEIGHT, `Minimum weight is ${MIN_WEIGHT} kg`)
    .max(MAX_WEIGHT, `Maximum weight is ${MAX_WEIGHT} kg`)
    .required("Desired weight is required"),

  birthday: Yup.string()
    .required("Birthday is required")
    .test("valid-date", "Invalid date", (value) => {
      if (!value) return false;

      const parsed = parse(value, "dd.MM.yyyy", new Date());

      return isValid(parsed);
    })
    .test("age", `You must be at least ${MIN_AGE} years old`, (value) => {
      if (!value) return false;

      const parsed = parse(value, "dd.MM.yyyy", new Date());

      if (!isValid(parsed)) return false;

      return parsed <= subYears(new Date(), MIN_AGE);
    }),

  sex: Yup.string()
    .oneOf(SEX_OPTIONS, "Invalid sex value")
    .required("Sex is required"),

  levelActivity: Yup.number()
    .oneOf(ACTIVITY_LEVEL_VALUES, "Invalid activity level")
    .required("Activity level is required"),
});

export const profileSetupSchema = profileDetailsSchema;

export const profileSettingsSchema = profileDetailsSchema.shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .min(2, "Minimal length 2 symbols")
    .max(20, "Maximal length 20 symbols"),

  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Incorrect email"),
});
