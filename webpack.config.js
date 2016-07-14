var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
	entry: {
		main: './assets/js/chat.js'
	},
	output: {
		path: './build/js',
		filename: '[name].js'
	},/*
	resolve: {
		modulesDirectories: ["js", "components", "node_modules"],
		root: path.resolve(__dirname),//parece não ser necessário
		extensions: ['','.js'],//parece não ser necessário
		alias:{
			highlights: './components/highlights.js',
			navigation: './../ui/navigation.js'
		}
	},*/
  	module: {
	    loaders: [
		    { test: /\.styl$/,
		      loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader") 
		  	},
		  	{ test: /\.css$/, loader: 'style-loader!css-loader' },
		  	//{ test: /\.(png|jpg)$/, loader: 'lipe?relativePath=./../..&name=[path][name].[ext]' }
		]
	},
	plugins: [
	   new ExtractTextPlugin("../css/[name].css",{
	        allChunks: true
	    })/*,
	   new webpack.optimize.UglifyJsPlugin({
	   	compress: {
	   		warnings: true
	   	},comments: false
	   })*/
	]
}