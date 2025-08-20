import { Link, useLocation } from "@tanstack/react-router";
import Nav from "./nav";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <header
      className={`px-6 absolute top-0 z-20 text-white w-full h-[150px] flex justify-between items-center${
        pathname !== "/"
          ? " bg-[url('/images/slides/bread-slidebg-01.jpg')] bg-center bg-cover"
          : ""
      }`}
    >
      {/* logo */}
      <Link to="/">
        <img
          src="/images/Logo.png"
          alt="Bagtanker logo"
          className="h-20 w-auto object-contain"
        />
      </Link>

      <Nav />
    </header>
  );
};
export default Header;
