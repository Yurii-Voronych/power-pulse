import * as Yup from "yup";
import { subYears } from "date-fns";

export const editProfileSchema = Yup.object({
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

  birthday: Yup.date()
    .typeError("Invalid date")
    .max(subYears(new Date(), 18), "You must be at least 18 years old")
    .required("Birthday is required"),

  blood: Yup.number()
    .oneOf([1, 2, 3, 4], "Invalid blood type")
    .required("Blood type is required"),

  sex: Yup.string()
    .oneOf(["male", "female"], "Invalid sex value")
    .required("Sex is required"),

  levelActivity: Yup.number()
    .oneOf([1, 2, 3, 4, 5], "Invalid activity level")
    .required("Activity level is required"),
});
