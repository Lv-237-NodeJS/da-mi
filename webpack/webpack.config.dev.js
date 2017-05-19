const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['./app/src/app.js']
  },
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  devServer : {
    contentBase : 'build'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'DA-MI',
      filename: 'index.html',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app'
    }),
    new ExtractTextPlugin('bundle.css')
  ]
};
