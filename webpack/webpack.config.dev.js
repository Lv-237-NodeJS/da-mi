const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Webpack = require('webpack');
const entryPath = './app/src/app.js';

module.exports = {
  entry: {
    app: [entryPath]
  },
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'build'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ],
    loaders: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'DA-MI',
      filename: 'index.html',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root'
    }),
    new ExtractTextPlugin('bundle.css'),
    new Webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
};
