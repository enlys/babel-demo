'use strict'
const webpack = require('webpack')
const {
    merge
} = require('webpack-merge')
const BaseWebpackConf = require('./webpack.base.conf')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 模板编译
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // JS压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // css压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css分离
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({
    filename: 'manifest.json',
    path: path.resolve(__dirname, '../dist'),
})
module.exports = merge(BaseWebpackConf, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[id].[chunkhash].js'
    },
    /*
     * optimization 是 webpack4改动最大的地方了,
     * https://webpack.js.org/configuration/optimization/
     */
    optimization: {

        runtimeChunk: {
            name: 'manifest'
        },
        /*
         * minizer: 默认开启 new UglifyJsPlugin()
         * 对 css 压缩的话, 需要重写 minizer
         */
        minimizer: [
            /*
             * js 压缩
             * https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
             */
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            /*
             * css 压缩
             * https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
             */
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            /*
             * 分离第三方资源
             */
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    plugins: [
        /*
         * 将css分离出来
         */
        new MiniCssExtractPlugin({
            filename: 'static/css/app.[name].css',
            chunkFilename: 'static/css/app.[contenthash].css'
        }),
        /*
         * html 模板
         */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        assetsPluginInstance,
        /*
         * 之前不是很理解这个插件的用法，后来看了这篇文章
         * 主要是讲多次构建代码的时候 如何做处理好缓存
         *  https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
         */
        // new webpack.HashedModuleIdsPlugin()
    ]
});