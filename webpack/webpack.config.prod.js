const WebpackStripLoader = require('strip-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let devConfig = require('./webpack.config.dev.js');
const rootPath = __dirname + '/';
const buildPath = __dirname + '/build';

let stripLoader = {
	test: [/\.js$/],
	exclude: /node_modules/,
	use: ['strip-loader']
};

let cleanBuildplagin = new CleanWebpackPlugin([buildPath], {
  root: rootPath,
  verbose: true,
  dry: false
});

devConfig.module.loaders.push(stripLoader);
devConfig.plugins.push(cleanBuildplagin);

module.exports = devConfig;
