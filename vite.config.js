import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("firebase")) return "firebase";
          if (id.includes("react-router")) return "router";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
