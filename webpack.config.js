const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "index.js",
    library: "react-auto-translate",
    libraryTarget: "umd",
    publicPath: "/dist/",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx"],
    alias: {
      react: require.resolve("react")
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
};
