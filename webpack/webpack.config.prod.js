var WebpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.dev.js');

var stripLoader = {
 test: [/\.js$/],
 exclude: /node_modules/,
 loader: 'strip-loader'
}

devConfig.module.rules.push(stripLoader);

module.exports = devConfig;
