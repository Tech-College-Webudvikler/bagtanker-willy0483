import { Link, useLocation } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";

const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const links = [
    {
      name: "Forside",
      path: "/",
    },
    {
      name: "Produkter",
      path: "/produkter",
    },
    {
      name: "Nyheder",
      path: "/nyheder",
    },
    {
      name: "Kontakt",
      path: "/kontakt",
    },
    {
      name: "Login",
      path: "/login",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col h-full"
        aria-describedby={undefined}
      >
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8 mx-10 mt-40">
          {links.map((link, index) => {
            return (
              <Link
                to={link.path}
                key={index}
                className={`${link.path === pathname && " text-green-gold border-b-2"} hover:text-green-gold`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default Nav;
