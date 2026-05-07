
import { defineConfig } from "vitest/config";

console.log("🔥 VITEST CONFIG LOADED");

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["tests/setup/db.setup.ts"],
  },
});