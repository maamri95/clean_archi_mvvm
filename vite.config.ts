import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "NXT_",
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "#src": path.resolve(__dirname, "src"),
      "#domain": path.resolve(__dirname, "src/domain"),
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
      "#env": path.resolve(__dirname, "env.ts"),
    },
  },
});
