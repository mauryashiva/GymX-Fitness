import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";

import myHeroImage from "../assets/images/my-gym-background.jpg";
import image1 from "../assets/images/my-gym-background1.jpg";
import image2 from "../assets/images/my-gym-background2.jpg";
import image3 from "../assets/images/my-gym-background3.jpg";
import image4 from "../assets/images/my-gym-background4.jpg";
import image5 from "../assets/images/my-gym-background5.jpg";
import image6 from "../assets/images/my-gym-background6.jpg";
import image7 from "../assets/images/my-gym-background7.jpg";
import image8 from "../assets/images/my-gym-background8.jpg";

const allImages = [
  myHeroImage,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
];

const HeroBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full flex items-center justify-center text-center px-6 py-20 overflow-hidden min-h-[420px]">
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={allImages[currentImageIndex]}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 2 },
          }}
          exit={{
            opacity: 0,
            scale: 1.08,
            transition: { duration: 1.5 },
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/65"></div>

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-3xl"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-medium text-white text-base md:text-lg mb-3">
          Your Fitness Journey Starts Here
        </p>

        <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
          Train Hard <br /> Stay Consistent
        </h1>

        <p className="text-sm md:text-base text-gray-200 mb-8">
          Build the best version of yourself. Unlock your potential with
          personalized workouts and expert guidance.
        </p>

        <motion.a
          href="#exercises"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-base rounded-full shadow-lg"
        >
          Explore Workouts
          <ArrowForward />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
