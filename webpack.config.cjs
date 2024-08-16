const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');


const config = {
  entry: './src/init.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'core.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: { ascii_only: true },
        },
      }),
    ],
  }
};

module.exports = config;