'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项

    entry: path.resolve(__dirname, './app.js'), //唯一入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash].js' //打包后输出的文件名并根据更改的内容添加hash
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
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),  //css分离
        new HtmlWebpackPlugin(), // 在打包文件夹中自动生成index.html并引入JS、CSS
        new webpack.HotModuleReplacementPlugin(), //启用模块热替换
        
    ]
   
};