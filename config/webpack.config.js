const path = require('path');
const webpack = require('webpack');
const {
    VueLoaderPlugin
} = require('vue-loader');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname, '..');

function resolve(dir) {
    return path.join(ROOT_PATH, dir);
};

module.exports = {
    context: resolve('src/client/javascripts'),
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader' // 处理vue
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 8000,
        open: true,
        hot: true
    }
};