var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ["./app/src/app.js"]
  },
  output: {
    path: path.resolve("build"),
    filename: "bundle.js"
  },
  devServer : {
    contentBase : "build"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ],
    loaders: []
  },
  plugins: [
    new HtmlWebpackPlugin(({
      title: 'DA-MI',
      filename: 'index.html',
      template: './app/src/component/template1.html'
    }))
  ]
};
