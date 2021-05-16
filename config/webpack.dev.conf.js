'use strict'
const webpack = require('webpack')
const BaseWebpackConf = require('./webpack.base.conf')
const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')


module.exports = merge(BaseWebpackConf, {
    /*
     * mode webpack4新内容
     * development：开启 NamedChunksPlugin 和 NamedModulesPlugin
     * production:FlagDependencyUsagePlugin,
     *            FlagIncludedChunksPlugin,
     *            ModuleConcatenationPlugin 作用域提升
     *            NoEmitOnErrorsPlugin, 不报错
     *            OccurrenceOrderPlugin,
     *            SideEffectsFlagPlugin
     *            UglifyJsPlugin. js压缩
     * 默认为 production
     */
    mode: 'development',
    /*
     *  按照什么方式生成代码
     *  https://webpack.js.org/configuration/devtool/
     */
    // devtool: 'cheap-module-eval-source-map',
    /*
     * 配置本地服务器
     * https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
        quiet: true,
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: path.resolve(__dirname, './dist/index.html')
            }]
        },
        contentBase: path.resolve(__dirname, './dist'),
        inline: true,
        progress: true,
        hot: true,
        compress: true,
        open: true,
        proxy: {}
    },
    plugins: [
        /* 热更新
         * https://webpack.js.org/guides/hot-module-replacement/
        */
        new webpack.HotModuleReplacementPlugin(),
        /*
         * html 模板
         * 把生成的资源插入到模板中,生成新的页面,避免手动管理资源
         * https://webpack.docschina.org/plugins/html-webpack-plugin/
         */
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname, '../index.html')
        }),
        /*
         * 错误友好提示
         * 如果代码出错了,控制台会显示错误,排版挺好看的
         * http://npm.taobao.org/package/friendly-errors-webpack-plugin
         */
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              'your application is running here http://localhost:8080 '
            ]
          }
        })
      ]
});