import Container from "@/components/Container";
import { UserIcon } from "@/components/icons/UserIcon";
import { WarningIcon } from "@/components/icons/WarningIcon";
import LogOutBtn from "@/components/LogOutBtn";
import CaloriesIntake from "@/components/ui/CaloriesIntake";
import SportMinutes from "@/components/ui/SportMinutes";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

const profilePage = async () => {
  const user = await getCurrentUser();
  return (
    <Container>
      <section className="mt-25.25 ">
        <h1 className="text-[24px] leading-[1.17] font-bold mb-10">
          Profile Settings
        </h1>
        {user && (
          <>
            <UserIcon className="w-22.5 h-22.5 border-2 border-orange rounded-full mb-8 mx-auto" />
            <p className="text-[18px] leading-[1.11] text-center mb-15.5">
              {user.name}
            </p>
            <div className="flex gap-3.5 mb-10">
              <CaloriesIntake amount={user.dailyNorm?.calories} />
              <SportMinutes amount={user.dailyNorm?.sportMinutes} />
            </div>
            <div className="flex gap-2 text-[14px] leading-[1.28] text-white/30 mb-11">
              <WarningIcon className="shrink-0" />
              We understand that each individual is unique, so the entire
              approach to diet is relative and tailored to your unique body and
              goals.
            </div>
            <LogOutBtn className="ml-auto" />
          </>
        )}
      </section>
    </Container>
  );
};

export default profilePage;
