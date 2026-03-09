import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./icons/LogoIcon";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import HeaderSettings from "./HeaderSettings";

const Header = async () => {
  const user = await getCurrentUser();
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <Container className="flex items-center justify-between h-15.25 md:h-21">
        <Link href={"/"}>
          <LogoIcon
            className="text-white w-31.5 h-3.25 md:w-37.75 md:h-4.25"
            dumbbellClassName="text-orange"
          />
        </Link>
        {user && <HeaderSettings />}
      </Container>
    </header>
  );
};

export default Header;
