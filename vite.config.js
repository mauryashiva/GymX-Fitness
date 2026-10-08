import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "GymX Fitness",
        short_name: "GymX",
        description: "Your ultimate fitness application.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "gym-icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "gym-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "gym-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10485760, // 10 MB
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // Exclude GIFs from precache
        runtimeCaching: [
          {
            urlPattern: /.*\.gif$/,
            handler: "CacheFirst",
            options: {
              cacheName: "gif-cache",
              expiration: {
                maxEntries: 1500,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
