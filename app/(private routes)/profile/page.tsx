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
    <Container className="flex flex-col 2xl:flex-row-reverse">
      <section className="mt-25.25 md:mt-39">
        <h1 className="text-[24px] leading-[1.17] font-bold mb-10 md:text-[30px] md:leading-snug">
          Profile Settings
        </h1>
        {user && (
          <>
            <UserIcon className="w-22.5 h-22.5 border-2 border-orange rounded-full mb-8 mx-auto md:w-37.5 md:h-37.5" />
            <p className="text-[18px] leading-[1.11] text-center mb-15.5 md:text-2xl md:mb-14.5">
              {user.name}
            </p>
            {user.dailyNorm && (
              <div className="flex gap-3.5 mb-10 w-fit mx-auto">
                {user.dailyNorm.calories && (
                  <CaloriesIntake amount={user.dailyNorm.calories} />
                )}
                {!user.dailyNorm.calories && (
                  <div className="bg-orange rounded-xl w-41.25 h-24 p-3.5 md:w-53.5 md:h-27 text-[12px] text-white/80">
                    We don&apos;t have enough info to count your daily norm!
                    Please, fill form bellow!
                  </div>
                )}
                <SportMinutes amount={user.dailyNorm.sportMinutes} />
              </div>
            )}
            <div className="flex gap-2 text-[14px] leading-[1.28] text-white/30 mb-11 md:text-[16px] md:leading-normal md:w-110 md:mx-auto md:mb-8">
              <WarningIcon className="shrink-0" />
              We understand that each individual is unique, so the entire
              approach to diet is relative and tailored to your unique body and
              goals.
            </div>
            <LogOutBtn className="ml-auto" />
          </>
        )}
      </section>
      <section className="w-full h-150 bg-blue-600"></section>
    </Container>
  );
};

export default profilePage;
