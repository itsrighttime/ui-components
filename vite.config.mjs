import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx,js,ts}",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/export.js"),
      name: "ItsRightTimeUI",
      formats: ["es", "cjs"],
      fileName: (format) =>
        `ui-components.${format === "es" ? "es" : "cjs"}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // Preserve asset file names
        assetFileNames: (assetInfo) => {
          // CSS files
          if (assetInfo.name.endsWith(".css")) {
            return "ui-components.css";
          }
          // Image files - preserve in assets folder
          if (/\.(png|jpe?g|svg|gif|ico|webp)$/.test(assetInfo.name)) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        // Prevent code splitting - keep everything in one file
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false, // Bundle all CSS into one file
    // Control asset inlining
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb, keep larger ones as files
    // Ensure source maps are not generated (optional, reduces size)
    sourcemap: false,
  },
});
