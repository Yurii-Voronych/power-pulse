"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ErrorIcon } from "./icons/ErrorIcon";
import BirthdayInput from "@/app/(private routes)/profile/edit/_formComponents/BirthdayInput";
import { parse } from "date-fns";
import { updateProfile } from "@/lib/client/api/userApi";
import useAuthStore from "@/lib/client/store/authStore";
import toast from "react-hot-toast";
import { profileSettingsSchema } from "@/lib/shared/validators/profile/editProfileSchema";
import { mapUserToFormValues } from "@/lib/shared/mappers/mapUserToFormValues";
import { User } from "@/lib/shared/types/user";
import { ACTIVITY_LEVELS, SEX_OPTIONS } from "@/lib/shared/constants/constants";
import axios from "axios";

import type {
  ActivityLevel,
  ProfileSettingsFormValues,
  ProfileSettingsInput,
  Sex,
} from "@/lib/shared/types/profile";

interface ProfileFormProps {
  user: User;
  onUpdated: (user: User) => void;
}
const ProfileForm = ({ user, onUpdated }: ProfileFormProps) => {
  const initialValues: ProfileSettingsFormValues = mapUserToFormValues(user);

  const setUser = useAuthStore((state) => state.setUser);
  const formatValuesToPayload = (
    values: ProfileSettingsFormValues,
  ): ProfileSettingsInput => ({
    height: Number(values.height),
    currentWeight: Number(values.currentWeight),
    desiredWeight: Number(values.desiredWeight),
    birthday: parse(values.birthday, "dd.MM.yyyy", new Date()),
    sex: values.sex as Sex,
    levelActivity: Number(values.levelActivity) as ActivityLevel,
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
  });
  const handleSubmit = async (
    values: ProfileSettingsFormValues,
    actions: FormikHelpers<ProfileSettingsFormValues>,
  ) => {
    try {
      const updUser = await updateProfile(formatValuesToPayload(values));
      setUser(updUser);
      onUpdated(updUser);
      actions.resetForm({
        values: mapUserToFormValues(updUser),
      });
      toast.success("Profile updated");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 409 &&
        error.response.data?.code === "EMAIL_ALREADY_IN_USE"
      ) {
        actions.setFieldError("email", "This email is already in use");
        return;
      }

      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={profileSettingsSchema}
    >
      {({ errors, touched, isSubmitting, dirty }) => (
        <Form>
          <div className="flex flex-col gap-5 mb-9 md:flex-row">
            <div className="relative">
              <Field
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby={
                  touched.name && errors.name ? "name-error" : undefined
                }
                className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors ${
                  Boolean(touched.name && errors.name)
                    ? "border-[#d80027] focus:border-[#d80027]"
                    : "border-white/30 focus:border-orange"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
              >
                Name
              </label>
              <ErrorMessage name="name">
                {(msg) => (
                  <span
                    id="name-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1"
                  >
                    <ErrorIcon /> {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
            <div className="relative">
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby={
                  touched.email && errors.email ? "email-error" : undefined
                }
                className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors ${
                  Boolean(touched.email && errors.email)
                    ? "border-[#d80027] focus:border-[#d80027]"
                    : "border-white/30 focus:border-orange"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
              >
                Email
              </label>
              <ErrorMessage name="email">
                {(msg) => (
                  <span
                    id="email-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1"
                  >
                    <ErrorIcon /> {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-5 mb-7 justify-items-start md:grid-cols-4  md:mb-8 2xl:w-174">
            <div className="relative">
              <Field
                id="height"
                name="height"
                type="text"
                inputMode="decimal"
                aria-invalid={Boolean(touched.height && errors.height)}
                aria-describedby={
                  touched.height && errors.height ? "height-error" : undefined
                }
                className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors ${
                  Boolean(touched.height && errors.height)
                    ? "border-[#d80027] focus:border-[#d80027]"
                    : "border-white/30 focus:border-orange"
                }`}
                placeholder=" "
              />

              <label
                htmlFor="height"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
              >
                Height
              </label>

              <ErrorMessage name="height">
                {(msg) => (
                  <span
                    id="height-error"
                    className="absolute -bottom-5 left-0 flex gap-1 text-xs leading-normal text-[#d80027]"
                  >
                    <ErrorIcon />
                    {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
            <div className="relative">
              <Field
                id="currentWeight"
                name="currentWeight"
                type="text"
                inputMode="decimal"
                aria-invalid={Boolean(
                  touched.currentWeight && errors.currentWeight,
                )}
                aria-describedby={
                  touched.currentWeight && errors.currentWeight
                    ? "current-weight-error"
                    : undefined
                }
                className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors ${
                  Boolean(touched.currentWeight && errors.currentWeight)
                    ? "border-[#d80027] focus:border-[#d80027]"
                    : "border-white/30 focus:border-orange"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="currentWeight"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
              >
                Current Weight
              </label>

              <ErrorMessage name="currentWeight">
                {(msg) => (
                  <span
                    id="current-weight-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute left-0 -bottom-5 mt-1 flex gap-1"
                  >
                    <ErrorIcon /> {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
            <div className="relative">
              <Field
                id="desiredWeight"
                name="desiredWeight"
                type="text"
                inputMode="decimal"
                aria-invalid={Boolean(
                  touched.desiredWeight && errors.desiredWeight,
                )}
                aria-describedby={
                  touched.desiredWeight && errors.desiredWeight
                    ? "desired-weight-error"
                    : undefined
                }
                className={`peer w-full rounded-xl border px-3.5 pb-1.5 pt-5 outline-none transition-colors ${
                  Boolean(touched.desiredWeight && errors.desiredWeight)
                    ? "border-[#d80027] focus:border-[#d80027]"
                    : "border-white/30 focus:border-orange"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="desiredWeight"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 transition-all duration-200
              peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs
              peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
              >
                Desired Weight
              </label>
              <ErrorMessage name="desiredWeight">
                {(msg) => (
                  <span
                    id="desired-weight-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute left-0 -bottom-5 mt-1 flex gap-1"
                  >
                    <ErrorIcon /> {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
            <div className="relative">
              <BirthdayInput
                name="birthday"
                error={errors.birthday}
                touched={touched.birthday}
              />
              <ErrorMessage name="birthday">
                {(msg) => (
                  <span
                    id="birthday-error"
                    className="text-[12px] text-[#d80027] leading-normal absolute left-0 -bottom-5 mt-1 flex gap-1"
                  >
                    <ErrorIcon /> {msg}
                  </span>
                )}
              </ErrorMessage>
            </div>
          </div>
          <div className="mb-10 text-white text-[14px] leading-[1.28] ">
            <fieldset
              aria-invalid={Boolean(touched.sex && errors.sex)}
              aria-describedby={
                touched.sex && errors.sex ? "sex-error" : undefined
              }
              className="relative text-white text-[14px]"
            >
              <legend className="mb-4">Sex:</legend>
              <div className="space-y-2">
                {SEX_OPTIONS.map((sex) => (
                  <label
                    key={sex}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Field
                      type="radio"
                      name="sex"
                      value={sex}
                      className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1"
                    />

                    <span className="capitalize">{sex}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage name="sex">
                {(msg) => (
                  <span
                    id="sex-error"
                    className="absolute -bottom-5 left-0 flex gap-1 text-xs text-[#d80027]"
                  >
                    <ErrorIcon />
                    {msg}
                  </span>
                )}
              </ErrorMessage>
            </fieldset>
          </div>
          <fieldset
            aria-invalid={Boolean(
              touched.levelActivity && errors.levelActivity,
            )}
            aria-describedby={
              touched.levelActivity && errors.levelActivity
                ? "level-activity-error"
                : undefined
            }
            className="relative mb-7 text-white text-[14px] leading-[1.28]"
          >
            <legend className="mb-3.5 ">Level Activity:</legend>
            <div className="space-y-2">
              {ACTIVITY_LEVELS.map((a) => (
                <label
                  className="flex items-center gap-2 cursor-pointer"
                  key={a.value}
                >
                  <Field
                    type="radio"
                    name="levelActivity"
                    value={String(a.value)}
                    className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
                  />
                  <span>{a.label}</span>
                </label>
              ))}
            </div>
            <ErrorMessage name="levelActivity">
              {(msg) => (
                <span
                  id="level-activity-error"
                  className="absolute -bottom-5 left-0 flex gap-1 text-xs text-[#d80027]"
                >
                  <ErrorIcon />
                  {msg}
                </span>
              )}
            </ErrorMessage>
          </fieldset>{" "}
          <button
            type="submit"
            className="btn-primary mb-5"
            disabled={isSubmitting || !dirty}
          >
            {isSubmitting ? "Saving" : "Save"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
