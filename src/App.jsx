import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";

const App = () => {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <div className="App bg-background text-text-primary min-h-screen pb-safe">
      {/* Top Navigation */}
      <Navbar />

      {/* Install Banner (PWA) */}
      <AnimatePresence>
        {deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-surface border-b border-gray-800 p-4 flex justify-between items-center shadow-lg pt-safe-top"
          >
            <div className="flex-1">
              <h3 className="font-bold text-white text-sm">Install GymX App</h3>
              <p className="text-xs text-gray-400">Add to home screen for a better experience</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeferredPrompt(null)}
                className="px-3 py-1.5 text-sm text-gray-400 hover:text-white"
              >
                Later
              </button>
              <button
                onClick={() => {
                  deferredPrompt.prompt();
                  deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === "accepted") {
                      console.log("User accepted the install prompt");
                    }
                    setDeferredPrompt(null);
                  });
                }}
                className="px-4 py-1.5 bg-primary text-background font-bold text-sm rounded-full"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with bottom padding for mobile tab bar */}
      <main className="max-w-7xl mx-auto min-h-screen pb-20 md:pb-0 pt-safe-top">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;
