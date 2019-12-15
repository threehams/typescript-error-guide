const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const MONACO_DIR = path.resolve(__dirname, "./node_modules/monaco-editor");
const util = require("util");

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: ["babel-loader"],
  });
  config.module.rules.push({
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
    include: MONACO_DIR,
  });
  config.plugins.push(new MonacoWebpackPlugin());
  config.resolve.extensions = [".ts", ".tsx", ".js"];
  config.externals = { "@microsoft/typescript-etw": "FakeModule" };
  return config;
};
