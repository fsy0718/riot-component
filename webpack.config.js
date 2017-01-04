"use strict";

const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    path.resolve(__dirname, 'src/index.tsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-component.js'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['', '.tsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx$/,
        loaders: ['awesome-typescript-loader']
      }
    ],
    preloaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]

  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/manifest.json')
    })
  ]
}

module.exports = config;