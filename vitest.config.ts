import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/__tests__/**/*.test.ts"],
    coverage: {
      exclude: ["src/index.ts", "src/types.ts"],
      include: ["src/**/*.ts"],
      provider: "v8",
      reporter: ["json", "lcov", "text", "clover"],
      reportsDirectory: "coverage",
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
});
