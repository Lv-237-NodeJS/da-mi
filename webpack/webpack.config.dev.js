const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const entryPath = './app/src/app.js';
const rootPath = path.resolve('./');
const srcPath = path.resolve('./', 'app/src');

module.exports = {
  entry: {
    app: ['bootstrap-loader', entryPath]
  },
  output: {
    path: rootPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      src: srcPath
    }
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
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
    new HtmlWebpackPlugin({
      title: 'DA-MI',
      filename: 'index.html',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root'
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.EnvironmentPlugin({'NODE_ENV': 'development'})
  ]
};
