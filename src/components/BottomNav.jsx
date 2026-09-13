import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, Heart, User, Dumbbell } from "lucide-react"; // Using Lucide React for modern icons

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
    { name: "Home", path: "/", icon: <Home size={24} /> },
    { name: "Search", path: "#search", icon: <Search size={24} />, onClick: handleSearchClick },
    { name: "Workouts", path: "/home-workouts", icon: <Dumbbell size={24} /> },
    { name: "Favorites", path: "#", icon: <Heart size={24} /> },
    { name: "Profile", path: "#", icon: <User size={24} /> },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-t border-gray-800 pb-safe pt-2 px-6 flex justify-between items-center"
    >
      {navItems.map((item) => (
        <React.Fragment key={item.name}>
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="flex flex-col items-center justify-center w-16 h-12 text-text-secondary hover:text-primary transition-colors"
            >
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </button>
          ) : (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-16 h-12 transition-colors ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.icon}
                  <span className={`text-[10px] mt-1 font-medium ${isActive ? "font-bold" : ""}`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-2 w-8 h-1 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  );
};

export default BottomNav;
