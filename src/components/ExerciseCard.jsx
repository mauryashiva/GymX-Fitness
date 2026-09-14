import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-[350px] mx-auto h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group border border-gray-800 flex flex-col"
    >
      <div className="w-full h-[60%] md:h-[70%] bg-white relative overflow-hidden flex items-center justify-center p-4">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 filter mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex-1 p-5 md:p-6 bg-surface flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-xl md:text-2xl tracking-tight text-text-primary leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
