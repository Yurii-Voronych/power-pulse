import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";

const EditProfilePage = async () => {
  const user = await getCurrentUser();

  if (user?.isProfileCompleted) {
    redirect("/diary");
  }

  return <EditProfileForm />;
};

export default EditProfilePage;
