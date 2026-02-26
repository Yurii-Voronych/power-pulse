import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./icons/LogoIcon";

const Header = async () => {
  const user = false;
  return (
    <Container className="flex items-center justify-between">
      <header className="h-15.25 md:h-21 flex items-center  ">
        <Link href={"/"}>
          <LogoIcon
            className="text-white w-31.5 h-3.25 md:w-37.75 md:h-4.25"
            dumbbellClassName="text-orange"
          />
        </Link>
      </header>
      {user && <div>hello</div>}
    </Container>
  );
};

export default Header;
