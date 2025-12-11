import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import postcss from "rollup-plugin-postcss";

export default defineConfig({
  plugins: [react()],

  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },

  build: {
    sourcemap: false,
    emptyOutDir: true,

    lib: {
      entry: path.resolve("src/export.js"),
      name: "ItsRightTimeUI",
      formats: ["es", "cjs"],
      fileName: (format) => `ui-components.${format}.js`,
    },

    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },

      plugins: [
        // postcss({
        //   extract: "style.css", // <-- IMPORTANT
        //   modules: false, // <-- ONLY extracts; Vite already processed modules
        //   minimize: true,
        // }),
      ],
    },
  },
});
