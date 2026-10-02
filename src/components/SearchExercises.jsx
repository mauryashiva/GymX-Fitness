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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const inputRef = useRef(null);

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

  useEffect(() => {
    const handleOpenSearch = () => {
      setIsOverlayOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    };

    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOverlayOpen]);

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
    setIsOverlayOpen(false);
    setTimeout(() => {
      document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleLocalSearch = () => {
    const isValidSearch = allSearchTerms
      .map((term) => term.toLowerCase())
      .includes(search.toLowerCase());

    if (search && isValidSearch) {
      onSearch(search);
      setSuggestions([]);
      setIsOverlayOpen(false);
      setTimeout(() => {
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      alert("Please select a valid exercise, body part, or equipment from the suggestions.");
    }
  };

  return (
    <>
      {/* Desktop Inline Search (Hidden on Mobile) */}
      <section className="hidden md:flex flex-col items-center mt-12 p-5 text-center w-full">
        <div className="relative w-full max-w-3xl mb-8">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="h-6 w-6" />
          </div>
          <input
            className="w-full h-16 bg-surface text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 pl-16 pr-40 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-lg"
            value={search}
            onChange={handleInputChange}
            placeholder="Search exercises, muscles, equipment..."
            type="text"
            onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
            onClick={(e) => e.target.select()}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-background font-bold h-12 px-8 rounded-full text-lg hover:bg-[#04e6d1] transition-colors duration-300 focus:outline-none"
            onClick={handleLocalSearch}
          >
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="absolute top-full mt-2 w-full bg-surface border border-gray-700 rounded-xl shadow-2xl z-10 text-left overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-5 py-3 text-text-primary hover:bg-gray-700 cursor-pointer transition-colors duration-200 capitalize"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative w-full max-w-7xl mb-8">
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Mobile Inline Categories (Visible when overlay is closed) */}
      <section className="md:hidden flex flex-col items-center w-full px-2 mt-4 mb-8">
        <h3 className="text-xl font-bold mb-4 w-full text-left px-2">Categories</h3>
        <div className="relative w-full">
           <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <HorizontalScrollbar
            data={bodyParts}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            isBodyParts
          />
           <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Full Screen Mobile Search Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col pt-safe-top pb-safe"
          >
            {/* Header */}
            <div className="flex items-center gap-2 p-4 border-b border-gray-800">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full bg-surface text-white placeholder-gray-500 rounded-xl py-3 pl-10 pr-4 focus:outline-none"
                  placeholder="Search exercises..."
                  value={search}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === "Enter" && handleLocalSearch()}
                />
              </div>
              <button
                onClick={() => setIsOverlayOpen(false)}
                className="p-2 text-text-secondary hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Suggestions */}
            <div className="flex-1 overflow-y-auto p-4">
              {suggestions.length > 0 ? (
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-4 border-b border-gray-800 text-text-primary active:bg-gray-800 capitalize"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              ) : search.length > 1 ? (
                <div className="text-center text-text-secondary mt-10">
                  No suggestions found for "{search}"
                </div>
              ) : (
                <div className="text-center text-text-secondary mt-10">
                  Type to search for exercises, target muscles, or equipment.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchExercises;
