const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		//publicPath: '/',
		filename: '[name].[hash].js'
	},
	module: {
		rules: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"]},
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{test: /\.png$/, loader: "url-loader?limit=100000"},
			{test: /\.jpg$/, loader: "file-loader"},
			{test: /\.gif$/, loader: "file-loader"},
			{test: /\.pdf$/, loader: "file-loader"},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
		new HtmlWebpackPlugin({
		    template: path.join(__dirname, 'src/index.html'),
            //favicon: 'src/img/favicon.png',
			inject: 'body',
		    path: 'dist',
		    excludeChunks: ['base'],
		    filename: 'index.html',
		    minify: {
		      collapseWhitespace: true,
		      collapseInlineTagWhitespace: true,
		      removeComments: true,
		      removeRedundantAttributes: true
		    }
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.DefinePlugin({
		    'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new UglifyJsPlugin(),
		new webpack.HashedModuleIdsPlugin(),
	],
	devServer: {
		contentBase: "./dist",
		port: 8080,
		historyApiFallback: true,
	},
};
