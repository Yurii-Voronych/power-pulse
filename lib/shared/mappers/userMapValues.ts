import { format } from "date-fns";
import { SettingsFormValues } from "@/components/ProfileForm";
import { User } from "@/types/types";

export const mapUserToFormValues = (user: User): SettingsFormValues => {
  return {
    name: user.name.toString() || "",
    email: user.email.toString() || "",
    height: user.profile?.height?.toString() || "",
    currentWeight: user.profile?.currentWeight?.toString() || "",
    desiredWeight: user.profile?.desiredWeight?.toString() || "",

    birthday: user.profile?.birthday
      ? format(new Date(user.profile.birthday), "dd.MM.yyyy")
      : "",

    blood: user.profile?.blood?.toString() || "",
    sex: user.profile?.sex || "",
    levelActivity: user.profile?.levelActivity?.toString() || "",
  };
};
