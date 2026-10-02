import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Heart, User, Dumbbell } from "lucide-react";

const BottomNav = () => {
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
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-gray-800 z-50 pb-safe pb-4">
      <div className="flex justify-around items-center h-16 px-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full transition-colors duration-200 ${
              isActive ? "text-primary" : "text-text-secondary hover:text-white"
            }`
          }
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <button
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center w-16 h-full text-text-secondary hover:text-white transition-colors duration-200 focus:outline-none"
        >
          <Search className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        <NavLink
          to="/home-workouts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 h-full transition-colors duration-200 ${
              isActive ? "text-primary" : "text-text-secondary hover:text-white"
            }`
          }
        >
          <Dumbbell className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Workouts</span>
        </NavLink>

        {/* Placeholders for future app-like features */}
        <button className="flex flex-col items-center justify-center w-16 h-full text-text-secondary hover:text-white transition-colors duration-200 focus:outline-none opacity-50 cursor-not-allowed">
          <Heart className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Saved</span>
        </button>

        <button className="flex flex-col items-center justify-center w-16 h-full text-text-secondary hover:text-white transition-colors duration-200 focus:outline-none opacity-50 cursor-not-allowed">
          <User className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
