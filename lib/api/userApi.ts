import { User } from "@/types/types";
import api from "./axios";
interface Respond {
  user: User;
}
export const getCurrentUser = async () => {
  const { data } = await api.get<Respond>("/users/me");
  return data.user;
};
