import React, { useEffect, useState, useRef } from "react";
import allBodyPartsData from "../data/bodyparts.json";
import allExercisesData from "../data/exercises.json";
import allEquipmentsData from "../data/equipments.json";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchExercises = ({ onSearch, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [bodyParts, setBodyParts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSearchTerms, setAllSearchTerms] = useState([]);

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
    setIsMobileSearchOpen(false); // Close mobile search overlay if open
    setTimeout(() => {
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsMobileSearchOpen(false); // Close mobile search overlay if open
      setTimeout(() => {
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      alert(
        "Please select a valid exercise, body part, or equipment from the suggestions."
      );
    }
  };

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsMobileSearchOpen(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  const renderSearchContent = () => (
    <>
      <div className="relative w-full max-w-3xl mb-8 md:mb-16 mt-8 md:mt-0 px-4 md:px-0">
        <div className="absolute left-9 md:left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
          <Search className="h-6 w-6" />
        </div>
        <input
          ref={searchInputRef}
          className="w-full h-14 md:h-16 bg-surface text-text-primary placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-14 md:pl-16 pr-24 md:pr-40 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          value={search}
          onChange={handleInputChange}
          placeholder="Search exercises, muscles..."
          type="text"
          onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
          onClick={(e) => e.target.select()}
        />
        <button
          className="absolute right-6 md:right-2 top-1/2 -translate-y-1/2 bg-primary text-white font-bold h-10 md:h-12 px-4 md:px-8 rounded-full text-sm md:text-lg hover:bg-red-600 transition-colors focus:outline-none z-10"
          onClick={handleLocalSearch}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full mx-4 md:mx-0 md:w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-20 text-left overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-5 py-3 text-text-secondary hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 capitalize border-b border-gray-800 last:border-b-0"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative w-full max-w-7xl px-2 md:px-0">
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={(part) => {
            setBodyPart(part);
            setIsMobileSearchOpen(false);
          }}
          isBodyParts
        />
      </div>
    </>
  );

  return (
    <>
      {/* Desktop View & Mobile Hidden Placeholder */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center bg-transparent py-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-10 tracking-tight text-text-primary">
          Find Your Perfect Workout, <br />
          <span className="text-primary">Right Now</span>
        </h2>
        {renderSearchContent()}
      </section>

      {/* Mobile Full-Screen Overlay View */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-50 bg-background flex flex-col pt-safe-top pb-safe overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-text-primary">Search</h2>
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 bg-surface rounded-full text-text-secondary hover:text-text-primary"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center pt-4">
              {renderSearchContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
