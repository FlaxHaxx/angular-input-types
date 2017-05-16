const webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const distDir = 'dist';

module.exports = {
  entry: {
    app: './src/_module.js'
  },
  output: {
    path: path.resolve(__dirname, distDir),
    filename: require('./package.json').name + '.min.js'
  },
  plugins: [
    new CleanWebpackPlugin(distDir),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin({banner: 'Angular Input Types v' + require('./package.json').version + `
(c) 2017 Jon Wikman. https://github.com/FlaxHaxx/angular-input-types
License: MIT`})
  ]
};
