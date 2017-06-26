const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const entryPath = './app/src/app.js';

module.exports = {
  entry: {
    app: ['bootstrap-loader', entryPath]
  },
  output: {
    path: path.resolve('./'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: 'build',
    historyApiFallback: true
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
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'DA-MI',
      filename: 'index.html',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root'
    }),
    new extractTextPlugin('bundle.css'),
    new webpack.EnvironmentPlugin({'NODE_ENV': 'development'})
  ]
};
