import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/ -> This is the replacement for react-scripts (instead of cra)
export default defineConfig({
  plugins: [react()],
});
