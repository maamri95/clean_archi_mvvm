import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["**/tests/**/*.test.?(c|m)[jt]s?(x)"],
      environment: "happy-dom",
      reporters: ["html"],
    },
  })
);
