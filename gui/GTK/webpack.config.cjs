const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: process.NODE_ENV || "development",
  entry: "./src",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.cjs"
  },
  module: {
    rules: [
      {
        test: /\.glade$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: { publicPath: "dist" }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  plugins: [new CleanWebpackPlugin()],
  externalsPresets: { node: true },
  externals: [nodeExternals()]
};
