/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Heart, User, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

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

  const navItems = [
    { to: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
    { to: "/home-workouts", icon: <Dumbbell className="w-6 h-6" />, label: "Workouts" },
    { action: handleSearchClick, icon: <Search className="w-6 h-6" />, label: "Search" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full md:hidden bg-surface/90 backdrop-blur-lg border-t border-gray-800 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => {
          if (item.action) {
            return (
              <button
                key={index}
                onClick={item.action}
                className="flex flex-col items-center justify-center w-full h-full text-text-secondary hover:text-primary transition-colors"
              >
                {item.icon}
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-colors relative ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute top-0 w-8 h-1 bg-primary rounded-b-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  {item.icon}
                  <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
