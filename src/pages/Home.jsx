import React, { useState } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";

import allExercisesData from "../data/exercises.json";
import HeroBanner from "../components/HeroBanner.jsx";
import SearchExercises from "../components/SearchExercises.jsx";
import Exercises from "../components/Exercises.jsx";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Home = () => {
  const [exercises, setExercises] = useState(allExercisesData);
  const [bodyPart, setBodyPart] = useState("all");

  const fuse = new Fuse(allExercisesData, {
    keys: ["name", "targetMuscles", "equipments", "bodyParts"],
    threshold: 0.4,
  });

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setExercises(allExercisesData);
      setBodyPart("all");
      return;
    }

    const results = fuse.search(searchTerm);
    const searchedExercises = results.map((result) => result.item);

    setExercises(searchedExercises);
    setBodyPart(searchTerm);
  };

  const handleBodyPartChange = (part) => {
    setBodyPart(part);

    if (part === "all") {
      setExercises(allExercisesData);
    } else {
      const filtered = allExercisesData.filter((exercise) =>
        exercise.bodyParts
          .map((bp) => bp.toLowerCase())
          .includes(part.toLowerCase()),
      );

      setExercises(filtered);
    }
  };

  return (
    <div className="w-full text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-gray-950 via-black to-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-start"
          >
            <HeroBanner />
          </motion.div>

          {/* Search */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            <SearchExercises
              onSearch={handleSearch}
              bodyPart={bodyPart}
              setBodyPart={handleBodyPartChange}
            />
          </motion.div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

      {/* EXERCISES SECTION */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
              Explore Our Exercises
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Discover a wide range of exercises for every muscle group. Search
              and filter workouts to build the perfect routine.
            </p>
          </motion.div>

          {/* Exercise Cards */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Exercises exercises={exercises} bodyPart={bodyPart} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
