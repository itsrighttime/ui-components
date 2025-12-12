const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",

  entry: {
    "index.esm": "./src/export.js",
    "index.cjs": "./src/export.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: {
      type: "module",
    },
  },

  experiments: {
    outputModule: true,
  },

  externals: {
    react: "react",
    "react-dom": "react-dom",
  },

  module: {
    rules: [
      // JS / JSX
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      // CSS MODULES (*.module.css)
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,        // <-- REQUIRED
              modules: {
                // auto: true,
                localIdentName: "[hash:base64:6]",
              },
            },
          },
        ],
      },

      // NORMAL CSS
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: true,        // <-- REQUIRED
            },
          },
        ],
      },

      // // IMAGES
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg)$/i,
      //   type: "asset/resource",
      //   generator: {
      //     filename: "assets/[name][hash][ext]",
      //   },
      // },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

  // Optional: remove asset size warnings
  performance: {
    hints: false,
  },
};
