import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/export.js"],   // or index.js (use your real entry)
  format: ["esm", "cjs"],
  outDir: "dist",
  clean: true,
  external: ["react", "react-dom"],
  cssModules: true,
  minify: true,
  legacyOutput: true,

  // Most important part:
  esbuildOptions(options) {
    options.jsx = "automatic";
    options.jsxImportSource = "react";
  }
});
