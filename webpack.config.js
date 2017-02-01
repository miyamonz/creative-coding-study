const webpack = require("webpack")

module.exports = {
  entry: {
    js: __dirname+"/src/index.js",
  },
  output: {
    path: __dirname+"/dst",
    filename: "index.js"
  },

  devServer: {
    contentBase: "dst"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {test: /\.html$/, loader: "file-loader?name=[name].[ext]"},
    ],
  },
}
