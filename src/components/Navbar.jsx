import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
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
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="text-xl font-extrabold tracking-tight text-white hidden sm:block">
            GymX
          </span>
        </NavLink>

        {/* Navigation Links & Search Shortcut */}
        <div className="flex items-center gap-6 md:gap-8 text-base font-medium">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                  : "no-underline text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-white"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/home-workouts"
              className={({ isActive }) =>
                isActive
                  ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                  : "no-underline text-text-secondary pb-1 font-medium transition-all duration-300 hover:text-white"
              }
            >
              Workouts
            </NavLink>
          </div>

          {/* Global Search Shortcut (Visible on Mobile & Desktop) */}
          <button
            onClick={handleSearchClick}
            className="flex items-center gap-2 p-2 rounded-full bg-gray-800 text-text-secondary hover:bg-gray-700 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:block text-sm pr-2">Search exercises...</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
