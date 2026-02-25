import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./icons/LogoIcon";

const Header = async () => {
  const user = false;
  return (
    <Container className="flex items-center justify-between">
      <header className="h-21 flex items-center  ">
        <Link href={"/"}>
          <LogoIcon className="text-white" dumbbellClassName="text-orange" />
        </Link>
      </header>
      {user && <div>hello</div>}
    </Container>
  );
};

export default Header;
