# GymX Fitness Website 💪

A modern and responsive fitness website built with React, Vite, and Tailwind CSS. This app operates on a fully local dataset of over 1,300 exercises, ensuring a fast, reliable, and offline-first experience.

**[Live Demo](https://gym-x-fitness.vercel.app/)** 🚀

---

## Features

- ⚡️ **Fully Independent & Fast:** Built with Vite and operates on a local JSON database, removing external API dependencies for core data and ensuring instant load times.
- 🎨 **Styled with Tailwind CSS:** A fully custom, responsive, and attractive dark-themed UI designed from the ground up.
- 🧠 **Smart Autocomplete Search:** A search bar with "suggestion-only" validation, powered by Fuse.js for smart, typo-tolerant searching.
- 🤸 **Comprehensive Exercise Database:** Browse over 1,300 exercises with filters for different body parts.
- 🎞️ **Animated Visuals:** Each exercise is demonstrated with a clear, animated GIF hosted locally.
- 📅 **Weekly Home Workout Plan:** A dedicated page with a curated, full-length video workout routine for each day of the week.
- 📺 **Integrated YouTube Videos:** Watch detailed exercise tutorials from YouTube, embedded directly on the exercise detail page.
- ✨ **Smooth Animations:** The entire application is polished with professional page transitions and component animations using Framer Motion.

---

## Tech Stack

- **Framework:** React.js (with Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Fuzzy Search:** Fuse.js
- **Animations:** Framer Motion
- **Icons:** Lucide React & MUI Icons
- **Data:** Local `exercises.json`, `bodyparts.json`, and GIF assets.
- **APIs:** YouTube Search API (from RapidAPI) for video details.

---

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/MauryaShiva/GymX-Fitness-App.git
cd GymX-Fitness-App
```

### 2\. Install Dependencies

This project uses `pnpm` as the package manager.

```bash
pnpm install
```

### 3\. Set Up Environment Variables

You will need a RapidAPI key to fetch YouTube videos.

- Create a file named `.env` in the root of the project.
- Add your RapidAPI key to this file:

<!-- end list -->

```env
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
```

### 4\. Run the Development Server

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🚀 Deployment

This application is deployed on **Vercel**. To deploy your own version, follow these steps:

1.  **Import Project:** Go to [Vercel](https://vercel.com/), sign up with your GitHub account, and import your repository.
2.  **Configure Project:** Vercel will automatically detect that you are using Vite and will set the correct **Build & Output Settings**.
3.  **Add Environment Variable:** In your Vercel project's **Settings -\> Environment Variables**, add your API key:
    - **Key:** `VITE_RAPIDAPI_KEY`
    - **Value:** _Your actual RapidAPI key_
4.  **Deploy:** Click the **Deploy** button.

---

## 📜 License

This project is licensed under the MIT License.

Copyright (c) 2026 Shiva Maurya
