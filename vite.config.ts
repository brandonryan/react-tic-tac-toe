import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, // Change to your preferred port
    open: true, // Opens the browser when server starts
  },
  build: {
    outDir: "dist", // Output directory for production build
    sourcemap: true, // Enables source maps for debugging
  },
});
