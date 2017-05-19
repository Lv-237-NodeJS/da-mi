const WebpackStripLoader = require('strip-loader');
const devConfig = require('./webpack.config.dev.js');

let stripLoader = {
	test: [/\.js$/],
	exclude: /node_modules/,
	loader: 'strip-loader'
}

devConfig.module.rules.push(stripLoader);

module.exports = devConfig;
