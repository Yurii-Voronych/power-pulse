import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";

export const pagesProtection = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return user;
};
