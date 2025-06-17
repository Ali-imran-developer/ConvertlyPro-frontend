import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/assets/logo/logo.png";
import { iconsBtn, buttonLinks, navLinks } from "../../data/data";
import ChatIcon from "../../../public/assets/icons/message.png";
import Pricing from "../../../public/assets/icons/crown.png";
import Login from "../../../public/assets/icons/login.png";
import { UserRoundCheck } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("authToken");
  console.log("hell1");

  useEffect(() => {
    console.log("hell2");
    setIsAuthenticated(!!token);
  }, [token]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="py-2 bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link className="flex items-center gap-2" to={"/"}>
            <img src={logo} alt="Logo" className="w-7 h-auto object-cover" />
            <h4 className="font-medium text-lg">Image To Text</h4>
          </Link>
          <nav className="hidden lg:flex justify-end items-center gap-2">
            <ul className="flex gap-3">
              {navLinks.map((link) => (
                <li className="border-r pr-3" key={link.name}>
                  <Link to={link.to}>
                    <span className="text-base font-medium">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hidden lg:flex gap-3">
          <Link to={"/"}>
            <button className="flex items-center gap-2 border-r pr-3">
              <img src={ChatIcon} className="w-6 h-auto object-cover" />
              <span className="text-base font-medium">Chat</span>
            </button>
          </Link>
          <Link to={"/"}>
            <button className="flex items-center gap-2 border-r pr-3">
              <img src={Pricing} className="w-6 h-auto object-cover" />
              <span className="text-base font-medium">Pricing</span>
            </button>
          </Link>
          {isAuthenticated ? (
            <Link to={'/profile'}>
              <button
                className="flex items-center gap-2 border-r pr-3"
              >
                <UserRoundCheck className="text-blue-600 w-6 h-auto object-cover" />
                <span className="text-base font-medium">profile</span>
              </button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="flex items-center gap-2 border-r pr-3">
                <img src={Login} className="w-6 h-auto object-cover" />
                <span className="text-base font-medium">Login</span>
              </button>
            </Link>
          )}
        </div>
        <div className="lg:hidden flex items-center gap-3">
          <button onClick={toggleMenu} className="text-gray-700">
            <img
              src={menuOpen ? iconsBtn[0].path : iconsBtn[1].path}
              alt="menu"
              className="w-10"
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-14 bg-white z-50 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="container mx-auto flex flex-col items-start px-4 space-y-6 pt-6">
          {navLinks.map((link) => (
            <Link
              to={link.to}
              className="text-black text-xl font-semibold"
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
          {buttonLinks.map((button) => (
            <Link
              to={button.to}
              className="text-black text-xl font-semibold flex items-center gap-2"
              key={button.name}
            >
              <img
                src={button.icon}
                alt={button.name}
                className="w-6 h-auto object-cover"
              />
              <span>{button.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
