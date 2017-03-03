var path = require("path");
var webpack = require("webpack");
module.exports = {
	cache: true,
	entry: path.join(__dirname, "assets/js/docs.js"),
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "build/assets/js/"),
		library: 'squatchDocs',
		libraryTarget: 'umd'
	},
	devtool: 'source-map',
	plugins: [
		new webpack.LoaderOptionsPlugin({
			// test: /\.xxx$/, // may apply this only for some modules
			options: {
				loaders: [{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					query: {
						presets: ['es2015']
					}
				}],
			}
		}),
		new webpack.ProvidePlugin({
			// Automtically detect jQuery and $ as free var in modules
			// and inject the jquery library
			// This is required by many jquery plugins
			jQuery: "jquery",
			$: "jquery"
		})
	],
};
