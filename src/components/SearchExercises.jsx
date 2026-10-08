/* eslint-disable no-unused-vars */
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
  const searchInputRef = useRef(null);

  useEffect(() => {
    const bodyPartNames = allBodyPartsData.map((item) => item.name);
    const equipmentNames = allEquipmentsData.map((item) => item.name);
    const exerciseNames = allExercisesData.map((item) => item.name);
    const uniqueTerms = [
      ...new Set([...bodyPartNames, ...equipmentNames, ...exerciseNames]),
    ];
    setAllSearchTerms(uniqueTerms);
    setBodyParts(["all", ...bodyPartNames]);

    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      // Small timeout to allow animation to start before focusing
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      const filteredSuggestions = allSearchTerms
        .filter((term) => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
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
    document
      .getElementById("exercises")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsMobileSearchOpen(false);
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  const renderSearchContent = (isMobile = false) => (
    <div className={`relative w-full ${isMobile ? 'max-w-full' : 'max-w-3xl'} mb-16`}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
        <Search className="h-6 w-6" />
      </div>
      <input
        ref={isMobile ? searchInputRef : null}
        className="w-full h-16 bg-surface/80 text-text-primary placeholder-text-secondary border border-gray-700 rounded-full py-2 pl-14 pr-[110px] text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md transition-all duration-300 shadow-inner"
        value={search}
        onChange={handleInputChange}
        placeholder="Search exercises, muscles..."
        type="text"
        onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
        onClick={(e) => e.target.select()}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-12 px-6 rounded-full text-sm sm:text-base hover:scale-105 active:scale-95 transform transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.4)] focus:outline-none"
        onClick={handleLocalSearch}
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-3 text-text-primary hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-b-0"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <section className="flex flex-col items-center mt-8 md:mt-12 p-5 text-center bg-transparent pt-8 pb-12 w-full max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 md:mb-12 tracking-tighter text-text-primary">
          Find Your Perfect Workout, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">
            Right Now
          </span>
        </h2>

        {/* Desktop Search Bar (Hidden on Mobile) */}
        <div className="hidden md:block w-full flex justify-center">
          {renderSearchContent()}
        </div>

        {/* Body Parts Horizontal Scroll */}
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

      {/* Mobile Full Screen Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col pt-safe-top pb-safe px-4 sm:hidden"
          >
            <div className="flex justify-between items-center py-4 mb-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-text-primary">Search</h3>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 bg-surface rounded-full text-text-secondary hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full">
              {renderSearchContent(true)}
            </div>

            {/* Quick Suggestions / Recent Searches could go here */}
            {!search && suggestions.length === 0 && (
              <div className="mt-8 text-center text-text-secondary">
                <p>Type to search exercises,</p>
                <p>body parts, or equipment</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
