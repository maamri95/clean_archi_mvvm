import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "#src": path.resolve(__dirname, "src"),
      "#domaine": path.resolve(__dirname, "src/domaine"),
      "#infrastructure": path.resolve(__dirname, "src/infrastructure"),
      "#presentation": path.resolve(
        __dirname,
        "src/infrastructure/presentation"
      ),
      "#data": path.resolve(__dirname, "src/data"),
      "#contracts": path.resolve(__dirname, "src/contracts"),
      "#utils": path.resolve(__dirname, "src/utils"),
      "#assets": path.resolve(__dirname, "src/assets"),
      "#config": path.resolve(__dirname, "src/config"),
    },
  },
});
