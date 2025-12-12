// webpack.config.js
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  mode: "production",

  entry: {
    "index.esm": "./src/export.js",
    "index.cjs": "./src/export.js",
  },

  output: {
    path: path.resolve("./dist"),
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
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                // auto: true,
                localIdentName: "[hash:base64:6]",
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][hash][ext]",
        },
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [new MiniCssExtractPlugin()],
};
