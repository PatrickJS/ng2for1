var webpack = require('webpack');
var optimize = webpack.optimize;
var DedupePlugin = optimize.DedupePlugin;
// var AngularPlugin = require('angular-webpack-plugin');
module.exports = {
  context: __dirname,
  entry: {
    app: ['./src/app.es6']
  },
  output: {
    path: './dist',
    filename: 'main.js'
  },
  module: {
    loaders: [{
      test: /.es6/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    // modulesDirectories: ['node_modules', 'bower_components'],
    alias: {
      'angular': './lib/angular.js',
      'annotation': './lib/annotation.js',
      'hacks': './lib/hacks.js'
    }
  },
  plugins: [
    // new AngularPlugin(),
    // Optimize output; dedupe
    new DedupePlugin(),
  ]
};
