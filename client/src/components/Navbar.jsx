import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-gray-100">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
