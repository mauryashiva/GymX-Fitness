import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Play } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
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
      className="flex flex-col lg:flex-row items-center gap-10 bg-surface rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 bg-white rounded-2xl overflow-hidden shadow-inner flex justify-center items-center p-4 relative"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-md object-contain mix-blend-multiply"
        />
        <div className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-primary/30">
          HD Animation
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold capitalize text-text-primary mb-4 leading-tight">
            {name}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize text-primary font-bold">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="text-secondary font-bold">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-col items-center bg-background rounded-2xl p-4 border border-gray-800 shadow-sm">
              <div className="bg-surface rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter invert opacity-80" />
              </div>
              <span className="capitalize text-sm font-semibold text-text-primary text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-background font-bold py-4 px-8 rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            {showInstructions ? <Info size={20} /> : <Play size={20} />}
            {showInstructions ? "Hide Instructions" : "View Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-background rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Step-by-step Guide</h3>
                  <ol className="space-y-4">
                    {instructions.map((step, index) => (
                      <li key={index} className="flex gap-4 text-text-secondary">
                        <span className="flex-shrink-0 w-8 h-8 bg-surface text-primary rounded-full flex items-center justify-center font-bold text-sm border border-gray-700">
                          {index + 1}
                        </span>
                        <p className="pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
