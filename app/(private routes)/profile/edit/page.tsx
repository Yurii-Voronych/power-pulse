import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Complete Your Profile | Power Pulse",
  description: "Training App",
};
const EditProfilePage = async () => {
  const user = await getCurrentUser();

  if (user?.isProfileCompleted) {
    redirect("/diary");
  }

  return <EditProfileForm />;
};

export default EditProfilePage;
