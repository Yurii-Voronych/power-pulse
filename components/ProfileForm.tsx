"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { ErrorIcon } from "./icons/ErrorIcon";
import BirthdayInput from "@/app/(private routes)/profile/edit/_formComponents/BirthdayInput";
import { parse } from "date-fns";
import { editProfileSchemaServer } from "@/lib/validators/profile/editProfileSchema.server";
import { updateProfile } from "@/lib/api/userApi";
import useAuthStore from "@/lib/store/authStore";
import toast from "react-hot-toast";
import { editProfileSchema } from "@/lib/validators/profile/editProfileSchema";
import { mapUserToFormValues } from "@/lib/services/userMapValues";

export interface SettingsFormValues {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
  blood: string;
  sex: string;
  levelActivity: string;
  name: string;
  email: string;
}

const ProfileForm = () => {
  const user = useAuthStore((state) => state.user);

  const initialValues = user
    ? mapUserToFormValues(user)
    : {
        height: "",
        currentWeight: "",
        desiredWeight: "",
        birthday: "",
        blood: "",
        sex: "",
        levelActivity: "",
        name: "",
        email: "",
      };

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (
    values: SettingsFormValues,
    actions: FormikHelpers<SettingsFormValues>,
  ) => {
    const raw = {
      ...values,
      height: Number(values.height),
      currentWeight: Number(values.currentWeight),
      desiredWeight: Number(values.desiredWeight),
      blood: Number(values.blood),
      levelActivity: Number(values.levelActivity),
      birthday: parse(values.birthday, "dd.MM.yyyy", new Date()),
    };

    const parsed = editProfileSchemaServer.safeParse(raw);

    if (!parsed.success) {
      return;
    }
    try {
      const user = await updateProfile(parsed.data);
      setUser(user);
      actions.resetForm();
    } catch {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={editProfileSchema}
      enableReinitialize
    >
      <Form>
        <div>
          <Field
            id="name"
            name="name"
            type="text"
            className="w-full h-11.5 2xl:h-12 p-3.5 border border-white/30 rounded-xl"
            placeholder="name"
          />
          <ErrorMessage name="name">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div>
          <Field
            id="email"
            name="email"
            type="text"
            className="w-full h-11.5 2xl:h-12 p-3.5 border border-white/30 rounded-xl"
            placeholder="email"
          />
          <ErrorMessage name="email">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div>
          <Field
            id="height"
            name="height"
            type="text"
            className="w-full h-11.5 2xl:h-12 p-3.5 border border-white/30 rounded-xl"
            placeholder="Height"
          />
          <ErrorMessage name="height">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div className="relative">
          <Field
            id="currentWeight"
            name="currentWeight"
            type="text"
            className="w-full h-11.5 2xl:h-12 p-3.5 border border-white/30 rounded-xl "
            placeholder="Current Weight"
          />
          <ErrorMessage name="currentWeight">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
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
            className="w-full h-11.5 2xl:h-13 p-3.5 border border-white/30 rounded-xl"
            placeholder="Desired Weight"
          />
          <ErrorMessage name="desiredWeight">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div className="relative">
          <BirthdayInput name="birthday" />
          <ErrorMessage name="birthday">
            {(msg) => (
              <span className="text-[12px] text-[#d80027] leading-normal absolute left-0 top-10.5 mt-1 flex gap-1">
                <ErrorIcon /> {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
        <div className="grid grid-cols-2 gap-3.5  2xl:w-48.75 mb-7 text-white text-[14px] leading-[1.28]">
          <div>
            <p className="mb-4 ">Blood:</p>

            <div className="space-y-2">
              {[1, 2, 3, 4].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Field
                    type="radio"
                    name="blood"
                    value={String(type)}
                    className=" appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="text-white text-[14px]">
            <p className="mb-4">Sex:</p>
            <div className="space-y-2">
              {["male", "female"].map((sex) => (
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
          </div>
        </div>
        <div className="text-white text-[14px] mb-7 leading-[1.28]">
          <p className="mb-3.5 ">Level Activity:</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Field
                type="radio"
                name="levelActivity"
                value="1"
                className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
              />
              <span>Sedentary lifestyle (little or no physical activity)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Field
                type="radio"
                name="levelActivity"
                value="2"
                className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
              />
              <span>
                Light activity (light exercises/sports 1-3 days per week)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Field
                type="radio"
                name="levelActivity"
                value="3"
                className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
              />
              <span>
                Moderately active (moderate exercises/sports 3-5 days per week)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Field
                type="radio"
                name="levelActivity"
                value="4"
                className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
              />
              <span>
                Very active (intense exercises/sports 6-7 days per week)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Field
                type="radio"
                name="levelActivity"
                value="5"
                className="appearance-none w-5 h-5 rounded-full border-2 border-[#636366] bg-transparent checked:shadow-[0_0_0_3px_black_inset] checked:bg-orange-1 checked:border-orange-1 shrink-0"
              />
              <span>
                Extremely active (very strenuous exercises/sports and physical
                work)
              </span>
            </label>
          </div>
        </div>
        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
};

export default ProfileForm;
