import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      navigate("/?search=true");
    } else {
      window.dispatchEvent(new Event("open-search"));
    }
  };

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "bg-surface/90 backdrop-blur-md shadow-lg border-b border-gray-800 py-3" : "bg-transparent py-4"
      } px-4 sm:px-8 md:px-12`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="GymX Logo"
            className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-lg p-1"
          />
          <span className="text-text-primary font-bold text-xl md:hidden tracking-tight">GymX</span>
        </NavLink>

        {/* Mobile Search Shortcut (Visible only on mobile header) */}
        <button
          onClick={handleSearchClick}
          className="md:hidden p-2 rounded-full bg-gray-800/50 text-text-primary hover:bg-gray-700 transition-colors"
          aria-label="Open Search"
        >
          <Search size={20} />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home-workouts"
            className={({ isActive }) =>
              isActive
                ? "no-underline text-primary border-b-2 border-primary pb-1 font-semibold transition-all duration-300"
                : "no-underline text-text-primary pb-1 font-medium transition-all duration-300 hover:text-primary hover:border-b-2 hover:border-primary"
            }
          >
            Home Workouts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
