import React from "react";
import { Link } from "react-router-dom";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link
      to={`/exercise/${exercise.exerciseId}`}
      className="relative w-full h-[360px] bg-gray-800 rounded-xl overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2"
    >
      {/* Exercise Image */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {/* Tags */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="bg-red-500/90 text-white text-xs font-semibold rounded-full capitalize py-1 px-3">
            {exercise.bodyParts[0]}
          </span>

          <span className="bg-yellow-500/90 text-white text-xs font-semibold rounded-full capitalize py-1 px-3">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise Name */}
        <h3 className="font-bold capitalize text-lg leading-snug">
          {exercise.name}
        </h3>
      </div>
    </Link>
  );
};

export default ExerciseCard;
