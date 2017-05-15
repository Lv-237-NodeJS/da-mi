var WebpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.dev.js');

var stripLoader = {
 test: [/\.js$/],
 exclude: /node_modules/,
 loader: WebpackStripLoader.loader('console.log')
}

devConfig.module.loaders.push(stripLoader);

module.exports = devConfig;