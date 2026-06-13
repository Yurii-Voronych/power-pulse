import { User } from "@/lib/shared/types/user";
import api from "./axios";
interface Credentials {
  name?: string;
  email: string;
  password: string;
}
interface Respond {
  user: User;
}
export const registerUser = async (credentials: Credentials) => {
  const { data } = await api.post<Respond>("/auth/register", credentials);
  return data.user;
};

export const loginUser = async (credentials: Credentials) => {
  const { data } = await api.post<Respond>("/auth/login", credentials);
  return data.user;
};

export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
