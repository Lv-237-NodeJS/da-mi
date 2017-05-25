const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const entryPath = './app/src/app.js';

module.exports = {
  entry: {
    app: entryPath
  },
  output: {
    path: path.resolve('./'),
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
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'DA-MI',
      filename: 'index.html',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
      links: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'
      ]
    }),
    new extractTextPlugin('bundle.css'),
    new webpack.EnvironmentPlugin({'NODE_ENV': 'development'})
  ]
};
