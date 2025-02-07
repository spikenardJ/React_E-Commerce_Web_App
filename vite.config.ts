import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ['**/*.test.ts', '**/*.spec.ts'], 
      input: "index.html"
    }
  }
})
