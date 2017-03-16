const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/_module.js', './src/validate.js', './src/orgnr.js', './src/personnummer.js']
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
    new webpack.BannerPlugin('Angular Input Types v' + require('./package.json').version + `
(c) 2017 Jon Wikman. https://github.com/FlaxHaxx/angular-input-types
License: MIT`)
  ]
};
