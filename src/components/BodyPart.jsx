import React from "react";
import { motion } from "framer-motion";

import Icon from "../assets/icons/gym.png";

const BodyPart = ({ item, bodyPart, setBodyPart }) => {
  const isSelected = bodyPart === item;

  return (
    <motion.div
      className={`
        group w-52 h-56 flex flex-col rounded-xl cursor-pointer bg-white 
        shadow-lg border-b-8 transform transition-all duration-300
        hover:scale-105 hover:-translate-y-2
        ${
          isSelected ? "border-red-500" : "border-gray-200 hover:border-red-200"
        }
      `}
      onClick={() => {
        setBodyPart(item);

        // ✅ The updated dynamic scroll logic
        // This finds the results section and scrolls to it.
        const exercisesSection = document.getElementById("exercises");
        if (exercisesSection) {
          exercisesSection.scrollIntoView({ behavior: "smooth" });
        }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col items-center justify-center h-full gap-5 p-4">
        <img
          src={Icon}
          alt={`${item} icon`}
          className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
        />
        <span
          className={`
            text-2xl font-semibold capitalize tracking-wide
            transition-colors duration-300
            ${
              isSelected
                ? "text-red-500"
                : "text-zinc-800 group-hover:text-red-500"
            }
          `}
        >
          {item}
        </span>
      </div>
    </motion.div>
  );
};

export default BodyPart;
