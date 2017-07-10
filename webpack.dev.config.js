'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    devtool: 'cheap-source-map', //配置生成Source Maps，选择合适的选项

    entry: {
        bundle: path.resolve(__dirname, './app.js'),
        // 引用的第三方库文件单独打包
        vendor: ['react', 'react-dom']
    }, //唯一入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', //打包后输出的文件名
        publicPath:'/'  //启动本地服务后的根目录
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
        new webpack.HotModuleReplacementPlugin(), //启用模块热替换
        new OpenBrowserPlugin({
            url: 'http://localhost:5000' 
        })
    ],
    resolve: {
        // 自动扩展文件后缀名
        extensions: ['.js', '.json', '.jsx', '.css']
    },
    devServer: {
        port: 5000, //开发环境端口5000
        historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        //colors:true, //设置为true，使终端输出的文件为彩色的
        hot: true, //使用热加载插件HotModuleReplacementPlugin
        inline: true, //实时刷新
        contentBase: path.resolve(__dirname, 'dist'), //静态资源目录
        publicPath: '/'
    }
};