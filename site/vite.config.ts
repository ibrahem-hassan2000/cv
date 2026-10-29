import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" + HashRouter: the build works under any path (GitHub Pages /cv/, a subfolder, or opened from disk).
// The data and CSS live one level up (study-guide/, project-guides/) so both the old dashboards and this app share them.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: { port: 5194, fs: { allow: [".."] } },
  build: { outDir: "dist", emptyOutDir: true, chunkSizeWarningLimit: 1500 }, // the content itself is ~1 MB
});
