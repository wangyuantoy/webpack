'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项

    entry: [
        // 为热替换(HMR)打包好代码
        // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, './app.js')
    ], //唯一入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js' //打包后输出的文件名
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }))
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),  //css分离
        new HtmlWebpackPlugin(), // 在打包文件夹中自动生成index.html并引入JS、CSS
        new webpack.HotModuleReplacementPlugin() //启用模块热替换
    ],
    resolve: {
        // 自动扩展文件后缀名
        extensions: ['', '.js', '.json']
    },
    devServer: {
        port: 5000, //开发环境端口5000
        hot: true, //告诉 dev-server 我们在使用 HMR
        inline: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};