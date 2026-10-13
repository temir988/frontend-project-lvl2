import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",

    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["json", "lcov", "text", "clover"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
