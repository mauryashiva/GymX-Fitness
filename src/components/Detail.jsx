/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Heart, ChevronDown } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } = exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon", label: "Body Part" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon", label: "Target" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon", label: "Equipment" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Image Section */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 bg-white"
      >
        <div className="aspect-square sm:aspect-video lg:aspect-square w-full relative">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Floating Action Button (Favorite) */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-4 bg-surface/80 backdrop-blur-md rounded-full shadow-lg border border-gray-700/50 text-text-primary hover:text-primary hover:scale-110 transition-all duration-300"
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
        </button>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
              {bodyParts[0]}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold capitalize text-text-primary tracking-tight leading-tight">
            {name}
          </h1>
          <p className="text-base sm:text-lg text-text-secondary mt-4 leading-relaxed">
            Exercises keep you strong. <span className="capitalize text-text-primary font-semibold">{name}</span> is one of the best
            exercises to target your <span className="text-text-primary font-semibold">{targetMuscles[0]}</span>. It will help you
            improve your mood and gain energy.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-col items-center justify-center p-4 bg-surface rounded-2xl border border-gray-800 shadow-md">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 filter brightness-0 invert opacity-80" />
              </div>
              <span className="text-xs text-text-secondary mb-1 uppercase tracking-wider">{item.label}</span>
              <span className="capitalize text-sm sm:text-base font-semibold text-text-primary text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        <div className="mt-4 bg-surface rounded-2xl border border-gray-800 overflow-hidden shadow-md">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg text-text-primary">Instructions</span>
            </div>
            <motion.div
              animate={{ rotate: showInstructions ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-text-secondary" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ol className="p-5 pt-0 list-decimal list-outside ml-5 space-y-4 text-text-secondary text-sm sm:text-base">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2 leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <button className="w-full py-4 mt-2 bg-gradient-to-r from-primary to-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transform hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2">
          <Play className="w-5 h-5 fill-current" /> Start Exercise
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
