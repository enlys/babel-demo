'use strict'
const path = require('path');
const {
  VueLoaderPlugin
} = require('vue-loader');
const webpack = require('webpack');
// const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const dev = process.env.NODE_ENV !== 'production';
const ROOT_PATH = path.resolve(__dirname, '..');

function resolve(dir) {
  return path.join(ROOT_PATH, dir);
}

module.exports = {
  context: resolve('src/client/javascripts'),
  // mode: 'development',
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  /*
   * 解析 vue
   * import Vur from 'vue' 实际上是
   * import Vue from 'vue/dist/vue.esm.js'
   */
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader', // 处理vue
        include: [resolve('src'), ],
      },
      /* babel 转码 */
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
      },
      /* 处理 css */
      {
        test: /\.css$/,
        use: [dev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader'
        }
      ],
        include: [resolve('src')]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new htmlWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  // devServer: {
  //   contentBase: './dist',
  //   host: 'localhost',
  //   port: 8000,
  //   open: true,
  //   hot: true
  // }
}