import { format } from "date-fns";
import { User } from "@/lib/shared/types/user";
import type { ProfileSettingsFormValues } from "@/lib/shared/types/profile";

export const mapUserToFormValues = (
  user: User,
): ProfileSettingsFormValues => {
  const levelActivity = user.profile?.levelActivity;

  return {
    name: user.name,
    email: user.email,
    height: user.profile?.height?.toString() ?? "",
    currentWeight: user.profile?.currentWeight?.toString() ?? "",
    desiredWeight: user.profile?.desiredWeight?.toString() ?? "",

    birthday: user.profile?.birthday
      ? format(new Date(user.profile.birthday), "dd.MM.yyyy")
      : "",
    sex: user.profile?.sex ?? "",
    levelActivity: levelActivity === undefined ? "" : `${levelActivity}`,
  };
};
