import React, { useState } from "react";
// ✅ Import 'motion' and 'AnimatePresence' for animations
import { motion, AnimatePresence } from "framer-motion";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  // ✅ Add state to manage showing/hiding the instructions
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div>Loading details...</div>;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon" },
  ];

  // Animation variants for a staggered fade-in effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-4 md:px-8 mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center">
        <div className="bg-white rounded-3xl p-4 md:p-8 w-full max-w-lg shadow-2xl relative overflow-hidden">
          {/* Subtle gradient overlay to blend with dark theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent pointer-events-none"></div>
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-auto object-cover rounded-xl mix-blend-multiply"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight mb-4">
            {name}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-semibold text-primary">{name}</span> is one of the best exercises to target your <span className="font-semibold text-white">{targetMuscles[0]}</span>. It will help you improve your mood and gain energy.
          </p>
        </div>

        <div className="flex flex-col gap-4 bg-surface p-6 rounded-2xl border border-gray-800">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6">
              <div className="bg-primary/10 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0 shadow-inner">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 md:w-10 md:h-10 filter invert brightness-0" />
              </div>
              <span className="capitalize text-xl md:text-2xl text-text-primary font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2 sticky bottom-24 z-10 md:static">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-primary text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-primary/30 hover:bg-red-600 transition-colors"
          >
            {showInstructions ? "Hide Instructions" : "View Step-by-Step Instructions"}
          </motion.button>
        </div>

        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-surface p-6 rounded-2xl border border-gray-800 mt-2">
                <h3 className="text-xl font-bold text-white mb-4">Instructions</h3>
                <ol className="list-decimal list-outside ml-5 space-y-4 text-text-secondary text-base md:text-lg">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2">{step}</li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
