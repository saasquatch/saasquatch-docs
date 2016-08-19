var path = require("path");
var webpack = require("webpack");
module.exports = {
	cache: true,
	entry: {
	    bundle: path.join(__dirname,"assets/js/docs.js"),
// 		jquery: "./app/jquery",
// 		bootstrap: ["!bootstrap-webpack!./app/bootstrap/bootstrap.config.js", "./app/bootstrap"],
// 		react: "./app/react"
	},
	output: {
		path: path.join(__dirname, "build/assets/js/"),
		publicPath: "build/assets/js/",
		filename: "[name].js",
		chunkFilename: "[chunkhash].js",
		sourceMapFilename: "[name].map"
	},
	module: {
		loaders: [
		]
	},
	devtool: 'source-map',
	resolve: {
		alias: {
			// Bind version of jquery
// 			jquery: "jquery-2.0.3"
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			// Automtically detect jQuery and $ as free var in modules
			// and inject the jquery library
			// This is required by many jquery plugins
			jQuery: "jquery",
			$: "jquery"
		})
	]
};