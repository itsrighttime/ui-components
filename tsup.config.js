import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/export.js"],
  format: ["esm", "cjs"],
  dts: false, // ❌ no types needed for JS
  sourcemap: false,
  clean: true,
  external: ["react", "react-dom"],
  cssModules: true, // ✅ important
  minify: true,
  skipNodeModulesBundle: true,
});
