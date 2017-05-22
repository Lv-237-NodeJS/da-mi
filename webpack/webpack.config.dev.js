const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['./app/src/app.js']
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
        loader: 'babel-loader'
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
    new CleanWebpackPlugin(['build'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    })
  ]
};
