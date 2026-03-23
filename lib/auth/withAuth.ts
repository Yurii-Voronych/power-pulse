import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export const withAuth = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return user;
};
