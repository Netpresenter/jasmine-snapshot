/*global __dirname, require, module*/
const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

var libraryName = 'jasmine-snapshot';
var plugins = [], outputFile;

if (env === 'build')
{
	outputFile = libraryName + '.min.js';
}
else
{
	outputFile = libraryName + '.js';
}

const config = {
	entry: __dirname + '/src/index.ts',
	devtool: 'source-map',
	output: {
		path: __dirname + '/lib',
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		modules: [path.resolve('./src'), path.resolve('./node_modules')],
		extensions: ['.json', '.js', '.ts'],
	},
	plugins: plugins,
	externals: {
		vkbeautify: 'vkbeautify',
		difflib: 'difflib',
		x2js: 'x2js'
	}
};

module.exports = config;
