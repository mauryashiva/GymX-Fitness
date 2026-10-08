/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use framer-motion v12 syntax for custom components
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      className="relative w-full max-w-[350px] sm:w-[350px] aspect-[4/5] bg-surface rounded-2xl overflow-hidden shadow-xl shadow-black/20 group flex flex-col"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Image Container */}
      <div className="relative w-full h-full">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-screen opacity-90"
          style={{ backgroundColor: "#ffffff" }} // Assuming gifs have white backgrounds, this helps them blend into dark theme
        />

        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
        {/* Tags */}
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider py-1.5 px-3 backdrop-blur-md shadow-lg">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/80 text-primary border border-primary/30 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider py-1.5 px-3 backdrop-blur-md shadow-lg">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold capitalize text-xl sm:text-2xl text-text-primary tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
