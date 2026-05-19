import { User } from "@/types/types";
import api from "./axios";
import { ProfileInput } from "../../shared/validators/profile/editProfileSchema.server";
interface Respond {
  user: User;
}
export const getCurrentUser = async () => {
  const { data } = await api.get<Respond>("/users/me");
  return data.user;
};
export const updateProfile = async (profile: ProfileInput) => {
  const { data } = await api.patch<Respond>("/users/profile", profile);
  return data.user;
};
