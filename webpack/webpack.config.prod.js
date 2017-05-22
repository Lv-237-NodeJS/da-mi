const WebpackStripLoader = require('strip-loader');
let devConfig = require('./webpack.config.dev.js');

let stripLoader = {
	test: [/\.js$/],
	exclude: /node_modules/,
	loader: 'strip-loader'
}

devConfig.module.loaders.push(stripLoader);

module.exports = devConfig;
