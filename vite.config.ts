import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// base: "./" => relatif yollar; GitHub Pages alt-dizininde de sorunsuz çalışır.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    // Firebase SDK doğası gereği büyük; uyarı eşiğini yükseltiyoruz.
    chunkSizeWarningLimit: 1200,
  },
});
