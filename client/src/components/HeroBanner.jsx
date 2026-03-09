import React, { useState, useEffect } from "react";
// ✅ 1. Import new hooks for parallax effect
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowForward } from "@mui/icons-material";

// ✅ 1. Using your exact local image imports as provided.
import myHeroImage from "../assets/images/my-gym-background.jpg";
import image1 from "../assets/images/my-gym-background1.jpg";
import image2 from "../assets/images/my-gym-background2.jpg";
import image3 from "../assets/images/my-gym-background3.jpg";
import image4 from "../assets/images/my-gym-background4.jpg";
import image5 from "../assets/images/my-gym-background5.jpg";
import image6 from "../assets/images/my-gym-background6.jpg";
import image7 from "../assets/images/my-gym-background7.jpg";
import image8 from "../assets/images/my-gym-background8.jpg";

// ✅ 2. Using your image array.
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
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  // ✅ 2. Setup for parallax mouse effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(
    useTransform(y, [-400, 400], [10, -10]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-400, 400], [-10, 10]),
    springConfig,
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // ✅ 3. Variants for staggered text animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative w-full h-full flex items-center justify-center text-center p-6 overflow-hidden min-h-[500px]"
      style={{ perspective: "1000px" }}
    >
      {/* Image Slider with "Ken Burns" animation */}
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={allImages[currentImageIndex]}
          // ✅ 3. Applied the smoother "Ken Burns" animation effect
          initial={{ opacity: 0, scale: 1.2 }} // Start slightly zoomed in and faded out
          animate={{
            opacity: 1,
            scale: 1, // Animate to normal scale
            transition: { duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }, // Slower, smoother fade-in
          }}
          exit={{
            opacity: 0,
            scale: 1.1, // Zoom out slightly on exit
            transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }, // Smooth fade-out
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* ✅ 4. Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>

      {/* ✅ 5. Content container with parallax and staggered animations */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p
          variants={itemVariants}
          className="font-semibold text-white text-lg md:text-xl mb-2 drop-shadow-xl"
        >
          Your Fitness Journey Starts Here
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="my-4 font-extrabold text-5xl md:text-7xl lg:text-8xl text-white leading-tight drop-shadow-2xl"
        >
          Train Hard <br /> Stay Consistent
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mb-10 text-lg text-white max-w-2xl drop-shadow-xl"
        >
          Build the best version of you. Unlock your potential with personalized
          workouts and expert guidance.
        </motion.p>
        <motion.a
          href="#exercises"
          variants={itemVariants}
          // ✅ 6. Added a subtle pulse animation to the button
          animate={{
            boxShadow: [
              "0px 0px 20px rgba(59, 130, 246, 0.4)",
              "0px 0px 30px rgba(59, 130, 246, 0.6)",
              "0px 0px 20px rgba(59, 130, 246, 0.4)",
            ],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 40px rgba(59, 130, 246, 0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-xl rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Explore Workouts
          <ArrowForward />
        </motion.a>
      </motion.div>

      {/* ✅ 7. Slider Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {allImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
