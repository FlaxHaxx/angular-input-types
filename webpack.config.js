const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/_module.js', './src/validate.js', './src/orgnr.js', './src/personnummer.js']
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: './dist',
    filename: 'angular-input-types.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        drop_console: true
      },
      mangle: false
    }),
    new webpack.BannerPlugin(`Angular Input Types v0.1.0-SNAPSHOT
(c) 2017 Jon Wikman. https://github.com/FlaxHaxx/angular-input-types
License: MIT`)
  ]
};
