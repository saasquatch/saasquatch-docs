var path = require("path");
var webpack = require("webpack");
var Visualizer = require("webpack-visualizer-plugin");

module.exports = {
  cache: true,
  mode: "production",
  entry: path.join(__dirname, "assets/js/docs.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "build/assets/js/"),
    library: "squatchDocs",
    libraryTarget: "umd"
  },
  externals: {
	jquery: "jQuery",
	"highlight.js": "hljs"
  },
  devtool: "source-map",
  plugins: [
    new Visualizer({
      filename: "./statistics.html"
    }),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: "babel-loader"
          }
        ]
      }
    })
  ]
};
