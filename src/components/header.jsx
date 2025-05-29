import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const navLinkStyle = ({ isActive }) =>
  isActive
    ? "relative text-blue-700 pb-2 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[3px] after:bg-blue-500 after:rounded-full"
    : "relative text-gray-700 hover:text-blue-500 pb-2 transition";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto  gap-10 flex justify-between md:justify-start items-center h-20 px-4">
        <Link to="/">
          <img className="w-32" src={logo} alt="Логотип" />
        </Link>

        <nav className="hidden md:flex gap-10 text-md lg:text-xl items-center">
          <NavLink to="/men" className={navLinkStyle}>
            Տղամարդու
          </NavLink>
          <NavLink to="/women" className={navLinkStyle}>
            Կանացի
          </NavLink>
          <NavLink to="/kids" className={navLinkStyle}>
            Մանկական
          </NavLink>
          <NavLink to="/accessories" className={navLinkStyle}>
            Աքսեսուարներ և Նվերներ
          </NavLink>
          <NavLink to="/corporate" className={navLinkStyle}>
            Կորպորատիվ
          </NavLink>
        </nav>

        <div
          className="md:hidden  text-2xl flex  cursor-pointer"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4">
          <nav className="flex flex-col gap-4 text-lg">
            <NavLink to="/men" className={navLinkStyle} onClick={toggleMenu}>
              Տղամարդկանց համար
            </NavLink>
            <NavLink to="/women" className={navLinkStyle} onClick={toggleMenu}>
              Կանանց համար
            </NavLink>
            <NavLink to="/kids" className={navLinkStyle} onClick={toggleMenu}>
              Երեխաների համար
            </NavLink>
            <NavLink
              to="/accessories"
              className={navLinkStyle}
              onClick={toggleMenu}
            >
              Աքսեսուարներ և Նվերներ
            </NavLink>
            <NavLink
              to="/corporate"
              className={navLinkStyle}
              onClick={toggleMenu}
            >
              Կորպորատիվ
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
