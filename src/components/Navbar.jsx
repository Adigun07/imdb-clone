// import { Link } from "react-router-dom";
import LogoIcon from "../assets/logo.svg?react";
import Menu from "./Menu.jsx";
import Searchbar from "./Searchbar.jsx";
const Navbar = () => {
  return (
    <>
      <nav className="flex bg-gray p-3 justify-center items-center gap-3">
        {/* <Link href="/"> */}
        <LogoIcon />
        {/* </Link> */}
        <Menu />
        <Searchbar />
      </nav>
    </>
  );
};

export default Navbar;
