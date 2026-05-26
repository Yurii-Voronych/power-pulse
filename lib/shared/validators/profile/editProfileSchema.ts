import * as Yup from "yup";
import { parse, isValid, subYears } from "date-fns";

export const editProfileSchema = Yup.object({
  name: Yup.string()
    .min(2, "Minimal length 2 symbols")
    .max(20, "Maximal length 20 symbols"),

  email: Yup.string().email("Incorrect email"),

  height: Yup.number()
    .typeError("Height must be a number")
    .min(150, "Minimum height is 150 cm")
    .required("Height is required"),

  currentWeight: Yup.number()
    .typeError("Current weight must be a number")
    .min(35, "Minimum weight is 35 kg")
    .required("Current weight is required"),

  desiredWeight: Yup.number()
    .typeError("Desired weight must be a number")
    .min(35, "Minimum weight is 35 kg")
    .required("Desired weight is required"),

  birthday: Yup.string()
    .required("Birthday is required")
    .test("valid-date", "Invalid date", (value) => {
      if (!value) return false;

      const parsed = parse(value, "dd.MM.yyyy", new Date());

      return isValid(parsed);
    })
    .test("age", "You must be at least 18 years old", (value) => {
      if (!value) return false;

      const parsed = parse(value, "dd.MM.yyyy", new Date());

      if (!isValid(parsed)) return false;

      return parsed <= subYears(new Date(), 18);
    }),

  sex: Yup.string()
    .oneOf(["male", "female"], "Invalid sex value")
    .required("Sex is required"),

  levelActivity: Yup.number()
    .oneOf([1, 2, 3, 4, 5], "Invalid activity level")
    .required("Activity level is required"),
});
