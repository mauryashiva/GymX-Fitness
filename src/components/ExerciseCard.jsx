import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-[350px] h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group block border border-gray-800"
    >
      <div className="w-full h-full bg-white relative">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover p-4 transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary text-white text-xs font-semibold rounded-full capitalize py-1.5 px-3 shadow-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/80 border border-gray-600 text-text-primary text-xs font-semibold rounded-full capitalize py-1.5 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
