import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: 'tests/vitest.setup.ts',
      isolate: true,
      include: ["**/*.test.?(c|m)[jt]s?(x)"],
      environment: "happy-dom",
      reporters: ["html", "default"],
      coverage: {
        provider: 'istanbul',
        exclude: ['**/diConfig.ts', '**/*Factory.ts', 'env.ts'],
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 80,
        cleanOnRerun: true,
        clean: true
      }
    },
  })
);
