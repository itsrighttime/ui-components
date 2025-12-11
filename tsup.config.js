import { defineConfig } from "tsup";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import fs from "fs";

const cssModuleMap = {};

export default defineConfig({
  entry: ["src/export.js"],
  format: ["esm", "cjs"],
  dts: false,
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ["react", "react-dom"],

  loader: {
    ".png": "file",
    ".jpg": "file",
    ".svg": "file",
  },

  async onSuccess() {
    // nothing here
  },

  esbuildOptions(options) {
    // Enable CSS loader
    options.loader = {
      ...options.loader,
      ".css": "copy",
    };
  },

  /**
   * IMPORTANT:
   * custom loader for CSS Modules
   */
  async banner() {
    return {
      js: `
        import "./export.css";
      `,
    };
  },

  /**
   * Hook: process CSS Modules manually
   */
  async beforeBuild() {
    const walkSync = function (dir, filelist = []) {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        if (fs.statSync(dir + "/" + file).isDirectory()) {
          filelist = walkSync(dir + "/" + file, filelist);
        } else {
          if (file.endsWith(".module.css")) {
            filelist.push(dir + "/" + file);
          }
        }
      });
      return filelist;
    };

    const cssFiles = walkSync("./src");

    let finalCSS = "";

    for (let file of cssFiles) {
      const rawCSS = fs.readFileSync(file, "utf8");

      await postcss([
        postcssModules({
          generateScopedName: "[name]__[local]__[hash:base64:5]",

          getJSON(cssFileName, json) {
            const key = cssFileName.replace("src/", "");
            cssModuleMap[key] = json;
          },
        }),
      ])
        .process(rawCSS, { from: file })
        .then((result) => {
          finalCSS += result.css + "\n";
        });
    }

    fs.writeFileSync("dist/export.css", finalCSS);

    // write classmap
    fs.writeFileSync(
      "dist/module-classmap.json",
      JSON.stringify(cssModuleMap, null, 2)
    );
  },
});
