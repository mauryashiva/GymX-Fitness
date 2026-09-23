import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  useEffect(() => {
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);
    setBodyParts(["all", ...bodyPartNames]);
  }, []);

  // Sync overflow hidden to body when mobile search is open
  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSearchOpen]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
    setIsMobileSearchOpen(false);
    setTimeout(() => {
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsMobileSearchOpen(false);
      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else if (search) {
      // In a real app we'd use a toast, fallback for now
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions.",
      );
    }
  };

  const renderSearchContent = (isMobile = false) => (
    <div
      className={`relative w-full ${isMobile ? "max-w-full" : "max-w-3xl"} mb-16`}
    >
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={isMobile ? inputRef : null}
        className="w-full h-16 bg-surface/50 text-white placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-16 pr-32 md:pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-black font-bold h-12 px-6 md:px-8 rounded-full text-base md:text-lg hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
        onClick={handleLocalSearch}
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-50 text-left overflow-hidden max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-4 text-text-primary hover:bg-gray-700 cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-0"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-text-secondary" />
                {suggestion}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className="flex flex-col items-center mt-6 md:mt-12 p-5 text-center bg-background text-white py-10 md:py-20">
      <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tighter">
        Find Your Perfect Workout, <br />
        <span className="text-primary">Right Now</span>
      </h2>

      {/* Desktop Search Input */}
      <div className="hidden md:block w-full flex justify-center">
        {renderSearchContent(false)}
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-[100] bg-background pt-safe-top pb-safe px-4 flex flex-col"
          >
            <div className="flex items-center justify-between py-4 mb-4">
              <h3 className="text-xl font-bold">Search</h3>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 bg-surface rounded-full text-text-secondary hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {renderSearchContent(true)}

            {!search && (
              <div className="mt-8 text-left">
                <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
                  Suggested Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "back",
                    "cardio",
                    "chest",
                    "lower arms",
                    "lower legs",
                    "neck",
                    "shoulders",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleSuggestionClick(cat)}
                      className="px-4 py-2 bg-surface rounded-full text-sm capitalize text-text-primary border border-gray-800 hover:border-primary transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-7xl">
        <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
        <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default SearchExercises;
