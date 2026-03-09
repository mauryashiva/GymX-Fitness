import React from "react";
import { motion } from "framer-motion";
import Icon from "../assets/icons/gym.png";

const BodyPart = ({ item, bodyPart, setBodyPart }) => {
  const isSelected = bodyPart === item;

  return (
    <motion.div
      className={`
        group w-40 h-44 flex flex-col items-center justify-center
        rounded-xl cursor-pointer bg-white
        shadow-md border-b-4 transition-all duration-300
        hover:scale-105 hover:-translate-y-1
        ${
          isSelected
            ? "border-red-500 shadow-red-200"
            : "border-gray-200 hover:border-red-300"
        }
      `}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        setBodyPart(item);

        const exercisesSection = document.getElementById("exercises");
        if (exercisesSection) {
          exercisesSection.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      {/* Icon */}
      <img
        src={Icon}
        alt={`${item} icon`}
        className="w-10 h-10 mb-3 transition-transform duration-300 group-hover:scale-110"
      />

      {/* Label */}
      <span
        className={`
          text-lg font-semibold capitalize tracking-wide
          transition-colors duration-300
          ${
            isSelected
              ? "text-red-500"
              : "text-gray-800 group-hover:text-red-500"
          }
        `}
      >
        {item}
      </span>
    </motion.div>
  );
};

export default BodyPart;
