import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    includeSource: ["src/**/*.ts"],
    include: ["src/**/*.spec.ts"],
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
