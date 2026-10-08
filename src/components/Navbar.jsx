import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md px-4 sm:px-8 md:px-12 py-3 sm:py-4 shadow-lg border-b border-gray-800 pt-safe-top">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
          />
          <span className="text-xl font-bold text-text-primary tracking-tight md:block">GymX</span>
        </NavLink>

        {/* Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Workouts
          </NavLink>
        </div>

        {/* Search Icon (Desktop & Mobile) */}
        <button
          onClick={handleSearchClick}
          className="p-2 text-text-secondary hover:text-primary transition-colors bg-gray-800/50 rounded-full md:bg-transparent"
          aria-label="Search"
        >
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
