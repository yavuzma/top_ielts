import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

// base: "./" => relative paths; works fine even in a GitHub Pages subdirectory.
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg", "icon-192.png", "icon-512.png", "icon-maskable.png"],
      manifest: {
        name: "NineBands — Your journey to IELTS 9",
        short_name: "NineBands",
        description:
          "IELTS prep from B1 to C1: vocabulary, grammar, daily reading-listening-writing, synced on every device.",
        theme_color: "#0b0f1a",
        background_color: "#0b0f1a",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        scope: "./",
        lang: "en",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        // Don't let the service worker cache Firebase/Google requests
        navigateFallbackDenylist: [/^\/__/, /firestore/, /googleapis/],
      },
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    // The Firebase SDK is large by nature; raise the warning threshold.
    chunkSizeWarningLimit: 1200,
  },
});
