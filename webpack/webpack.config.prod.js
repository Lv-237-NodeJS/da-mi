const WebpackStripLoader = require('strip-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let devConfig = require('./webpack.config.dev.js');
const path = require('path');
const root = path.resolve('./');

let stripLoader = {
	test: [/\.js$/],
	exclude: /node_modules/,
	loader: 'strip-loader'
};

let cleanBuildplagin = new CleanWebpackPlugin(['build'], {
  root: root,
  verbose: true,
  dry: false
});

devConfig.module.loaders.push(stripLoader);
devConfig.plugins.push(cleanBuildplagin);

module.exports = devConfig;
