import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

// base: "./" => relatif yollar; GitHub Pages alt-dizininde de sorunsuz çalışır.
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg", "icon-192.png", "icon-512.png", "icon-maskable.png"],
      manifest: {
        name: "NineBands — IELTS 9 yolculuğun",
        short_name: "NineBands",
        description:
          "B1'den C1'e IELTS hazırlık: kelime, grammar, günlük okuma-dinleme-yazma, her cihazda senkron.",
        theme_color: "#0b0f1a",
        background_color: "#0b0f1a",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        scope: "./",
        lang: "tr",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        // Firebase/Google istekleri service worker tarafından önbelleğe alınmasın
        navigateFallbackDenylist: [/^\/__/, /firestore/, /googleapis/],
      },
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    // Firebase SDK doğası gereği büyük; uyarı eşiğini yükseltiyoruz.
    chunkSizeWarningLimit: 1200,
  },
});
