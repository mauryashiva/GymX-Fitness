import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Dumbbell, Calendar, Search } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.dispatchEvent(new Event("open-search"));
    } else {
      navigate("/?search=true");
    }
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={24} /> },
    { name: "Search", path: "#search", icon: <Search size={24} />, onClick: handleSearchClick },
    { name: "Workouts", path: "/home-workouts", icon: <Calendar size={24} /> },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-lg border-t border-gray-800 pb-safe"
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path && item.name !== "Search";

          return item.onClick ? (
            <button
              key={item.name}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 text-text-secondary hover:text-primary transition-colors`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.name}</span>
            </button>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-primary" : "text-text-secondary hover:text-primary"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;