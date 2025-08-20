import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { useAuth } from "@/lib/utils";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { loginData, logout } = useAuth();
  const isLoggedIn = !!loginData;

  const links = [
    {
      name: "Forside",
      path: "/",
    },
    {
      name: "Produkter",
      path: "/products",
    },
    {
      name: "Nyheder",
      path: "/nyheder",
    },
    {
      name: "Kontakt",
      path: "/kontakt",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

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

          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-green-gold">
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`${pathname === "/login" && " text-green-gold border-b-2"} hover:cursor-pointer hover:text-green-gold`}
            >
              Login
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default Nav;
