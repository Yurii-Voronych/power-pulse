import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { formatDiaryDate } from "@/lib/shared/utils/diaryDate";
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
    redirect(`/diary/${formatDiaryDate(new Date())}`);
  }

  return <EditProfileForm />;
};

export default EditProfilePage;
