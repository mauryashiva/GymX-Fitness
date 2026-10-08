/* eslint-disable no-unused-vars */
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
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content - Added safe area and padding for navbars */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 pt-[80px] pb-[80px] md:pb-6 relative z-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/exercise/:id"
              element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExerciseDetail />
                </motion.div>
              }
            />
            <Route
              path="/home-workouts"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <HomeWorkouts />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-[80px] md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-surface p-4 rounded-xl shadow-2xl border border-gray-700 z-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <img src="/gym-icon.png" alt="GymX" className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Install GymX</h4>
                <p className="text-xs text-text-secondary">Add to home screen</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-xs px-3 py-1.5 text-text-secondary hover:text-white"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="text-xs px-3 py-1.5 bg-primary text-white rounded-md font-medium"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Section (Hidden on mobile to prioritize BottomNav) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

export default App;
