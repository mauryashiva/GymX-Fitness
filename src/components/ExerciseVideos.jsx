import React, { useState } from "react"; // 1. Import useState
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircleOutline, Close } from "@mui/icons-material";

// ✅ New component for the embedded video player modal
const VideoPlayerModal = ({ videoId, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative bg-surface rounded-lg shadow-2xl w-full max-w-3xl aspect-video">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-1 text-background hover:bg-gray-200"
          aria-label="Close video player"
        >
          <Close />
        </button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>
    </motion.div>
  );
};

const ExerciseVideos = ({ exerciseVideos, name }) => {
  // ✅ 2. State to keep track of the video to play
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  if (!exerciseVideos || exerciseVideos.length === 0) {
    return (
      <div className="mt-12 lg:mt-24 px-5 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-secondary">
          Loading videos...
        </h2>
      </div>
    );
  }

  return (
    <>
      {/* ✅ 3. AnimatePresence allows the modal to have an exit animation */}
      <AnimatePresence>
        {selectedVideoId && (
          <VideoPlayerModal
            videoId={selectedVideoId}
            onClose={() => setSelectedVideoId(null)}
          />
        )}
      </AnimatePresence>

      <motion.section
        className="px-4 md:px-8 mt-12 md:mt-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-12 text-text-primary tracking-tight">
          Watch <span className="text-primary capitalize">{name}</span> Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {exerciseVideos.slice(0, 3).map((item, index) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -5 }}
              key={index}
              onClick={() => setSelectedVideoId(item.video.videoId)}
              className="group flex flex-col w-full bg-surface rounded-2xl shadow-lg overflow-hidden text-left border border-gray-800 transition-shadow duration-300 hover:shadow-primary/20"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={item.video.thumbnails[0].url}
                  alt={item.video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircleOutline sx={{ fontSize: 64, color: "#ff2625" }} />
                </div>
              </div>
              <div className="p-4 md:p-5">
                <h3
                  className="text-base md:text-lg font-bold text-text-primary line-clamp-2 leading-tight group-hover:text-primary transition-colors"
                  title={item.video.title}
                >
                  {item.video.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2">
                  {item.video.channelName}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default ExerciseVideos;
