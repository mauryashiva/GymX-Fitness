import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div className="text-center p-10 text-text-secondary">Loading details...</div>;
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
      className="flex flex-col w-full bg-background pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section - Full width on mobile, rounded on desktop */}
      <motion.div variants={itemVariants} className="w-full relative bg-surface">
         <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-[50vh] md:h-[60vh] object-contain md:object-cover md:rounded-3xl shadow-2xl bg-white"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none md:rounded-3xl"></div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-4 md:px-8 -mt-10 relative z-10"
      >
        <div className="bg-surface p-6 md:p-8 rounded-3xl shadow-xl border border-gray-800">
          <h1 className="text-3xl md:text-5xl font-extrabold capitalize text-text-primary tracking-tight mb-4">
            {name}
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8">
            Exercises keep you strong.{" "}
            <span className="capitalize font-bold text-primary">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-bold text-secondary">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {extraDetail.map((item) => (
              <div key={item.name} className="flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:bg-gray-700 transition-colors">
                <div className="bg-primary/20 p-3 rounded-full mb-3">
                  <img src={item.icon} alt={item.alt} className="w-6 h-6 md:w-8 md:h-8 filter brightness-0 invert" />
                </div>
                <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">{item.label}</span>
                <span className="capitalize text-sm md:text-base font-bold text-text-primary text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions Accordion */}
          <div className="mt-4">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 text-text-primary font-bold py-4 px-6 rounded-2xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="text-lg">Step-by-Step Instructions</span>
              {showInstructions ? <ChevronUp className="w-6 h-6 text-primary" /> : <ChevronDown className="w-6 h-6 text-primary" />}
            </button>

            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <ol className="list-decimal list-outside ml-4 mt-6 space-y-4 text-text-secondary md:text-lg">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2 leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
