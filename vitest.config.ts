import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    include: ["test/**/*.test.js"],
    coverage: {
      enabled: true,
      include: ["src/**/*.ts"],
      reporter: ["text", "html"],
    },
    browser: {
      provider: "playwright",
      enabled: true,
      name: "chromium",
      headless: true,
      screenshotFailures: false,
    },
  },
});
