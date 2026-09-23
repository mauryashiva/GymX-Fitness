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
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative w-full sm:w-[350px] aspect-[4/5] sm:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group flex-shrink-0"
    >
      <div className="absolute inset-0 bg-surface">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end h-full">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-black text-xs font-bold rounded-full capitalize py-1 px-3 shadow-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/80 border border-gray-600 text-white text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md shadow-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-bold capitalize text-2xl tracking-tight text-white line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
