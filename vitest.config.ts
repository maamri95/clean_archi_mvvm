import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        setupFiles: "tests/vitest.setup.ts",
        include: ["**/*.test.?(c|m)[jt]s?(x)"],
        environment: "happy-dom",
        reporters: ["html", "default"],
        coverage: {
          thresholds: {
            lines: 80,
            functions: 80,
            statements: 80,
            branches: 60,
          },
          provider: "istanbul",
          exclude: [
            "**/diConfig.ts",
            "**/*Factory.ts",
            "env.ts",
            "**/*QueryProvider*",
            ".storybook/**",
            "playwright**",
            "src/config/**",
            ".eslintrc.cjs",
            "html/**",
            "src/contracts/**"
          ],
          cleanOnRerun: true,
          clean: true,
        },
      },
    }),
);
