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
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div className="App bg-background min-h-screen flex flex-col text-text-primary">
      {/* PWA Install Banner */}
      <AnimatePresence>
        {deferredPrompt && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] bg-surface border-b border-gray-800 p-4 pt-safe-top flex justify-between items-center shadow-lg"
          >
            <div className="flex items-center gap-3">
              <img src="/gym-icon.png" alt="App Icon" className="w-10 h-10 rounded-lg" />
              <div>
                <p className="font-bold text-sm">GymX Fitness</p>
                <p className="text-xs text-text-secondary">Install the app for a better experience</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeferredPrompt(null)}
                className="px-3 py-1 text-sm text-text-secondary hover:text-white"
              >
                Not Now
              </button>
              <button
                onClick={handleInstallClick}
                className="px-4 py-1 text-sm bg-primary text-white rounded-full font-semibold"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area (App Shell) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-24 md:pb-8 pb-safe relative">
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
