import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    // Main container: Dark theme, rounded corners, and Framer Motion for tap/hover animations
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative block w-full max-w-[350px] mx-auto aspect-[3/4] bg-surface rounded-2xl overflow-hidden shadow-lg group"
    >
      {/* Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />

      {/* Gradient overlay for better text readability and a professional look */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>

      {/* Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10 flex flex-col justify-end h-full">
        {/* Tags with a modern, semi-transparent background */}
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-background text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/90 text-background text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise name with improved typography */}
        <h3 className="font-bold capitalize text-xl sm:text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
