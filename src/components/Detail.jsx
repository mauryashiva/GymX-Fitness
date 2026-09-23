import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Play } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return (
      <div className="text-white text-center py-10">Loading details...</div>
    );
  }

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyParts[0],
      alt: "body part icon",
      label: "Body Part",
    },
    {
      icon: TargetImage,
      name: targetMuscles[0],
      alt: "target muscle icon",
      label: "Target",
    },
    {
      icon: EquipmentImage,
      name: equipments[0],
      alt: "equipment icon",
      label: "Equipment",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row p-4 md:p-6 lg:p-10 items-start gap-8 lg:gap-16 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Large Hero GIF Section with Premium Styling */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 flex justify-center"
      >
        <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-surface shadow-2xl border border-gray-800">
          <div className="aspect-square md:aspect-[4/3] w-full relative">
            <img
              src={gifUrl}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover mix-blend-screen opacity-90"
            />
            {/* Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          </div>

          {/* Overlay Quick Info */}
          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 flex flex-wrap gap-2">
            {extraDetail.map((item) => (
              <span
                key={item.name}
                className="px-4 py-1.5 bg-surface/80 backdrop-blur-md border border-gray-600 rounded-full text-xs md:text-sm font-semibold text-white capitalize shadow-lg"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Hierarchy & Spacing */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold capitalize text-white tracking-tight leading-tight">
            {name}
          </h1>
          <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-white">{name}</span>{" "}
            is one of the best exercises to target your{" "}
            <span className="font-semibold text-primary">
              {targetMuscles[0]}
            </span>
            . It will help you improve your mood and gain energy.
          </p>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mt-2">
          {extraDetail.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center p-4 bg-surface rounded-2xl border border-gray-800"
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3">
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="w-6 h-6 md:w-8 md:h-8 filter invert opacity-80"
                />
              </div>
              <span className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                {item.label}
              </span>
              <span className="capitalize text-sm md:text-base font-semibold text-white text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Sticky/Interactive Instructions Section */}
        <div className="mt-4 bg-surface rounded-3xl p-6 md:p-8 border border-gray-800 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-primary" />
              Instructions
            </h3>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-sm font-semibold text-primary hover:text-white transition-colors"
            >
              {showInstructions ? "Hide" : "Show"}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {showInstructions && (
              <motion.ol
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="list-none space-y-4"
              >
                {instructions.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 text-text-secondary md:text-lg"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </motion.li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
