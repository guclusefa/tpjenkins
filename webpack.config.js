const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "server.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js",
  },
  plugins: [new HtmlWebpackPlugin()],
};