const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // Your main entry file
  output: {
    filename: "bundle.js", // Output file name
    path: path.resolve(__dirname, "../API/ww.root"), // Updated output directory
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match .ts and .tsx files
        use: "ts-loader", // Use ts-loader to process them
        exclude: /node_modules/, // Exclude dependencies
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // File extensions Webpack resolves
  },
  mode: "development", // Use 'production' for deployment
};
