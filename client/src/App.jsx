import React from "react";
import { Route, Routes } from "react-router-dom";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";
import TodaysWorkout from "./pages/TodaysWorkout.jsx";

const App = () => {
  return (
    <div className="App bg-[#fffafb]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/home-workouts" element={<HomeWorkouts />} />
          <Route path="/todays-workout" element={<TodaysWorkout />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
