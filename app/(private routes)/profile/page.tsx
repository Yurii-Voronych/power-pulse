import Container from "@/components/Container";
import ProfileSettings from "@/components/ProfileSettings";
import { getCurrentUser } from "@/lib/server/auth/getCurrentUser";
import { Metadata } from "next";

import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Profile | Power Pulse",
  description: "Training App",
};
const profilePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  if (!user.profile || !user.dailyNorm) {
    redirect("/profile/edit");
  }
  return (
    <>
      <h1 className="text-[24px] leading-[1.17] font-bold mb-10 mx-auto pl-5 md:pl-8 2xl:pl-24 md:text-[30px] md:leading-snug mt-25.25 md:mt-39 max-w-360">
        Profile Settings
      </h1>
      <Container className="flex flex-col 2xl:flex-row-reverse 2xl:justify-between">
        <ProfileSettings initialUser={user} />
      </Container>
    </>
  );
};

export default profilePage;
