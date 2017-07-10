'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const WebpackMd5Hash = require('webpack-md5-hash');
module.exports = {
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项

    entry:{
        bundle:path.resolve(__dirname, './app.js'),
        vendor:['react','react-dom']

    }, //唯一入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js' //打包后输出的文件名并根据更改的内容添加hash
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
        new ExtractTextPlugin('styles.[contenthash:8].css'),  //css分离
        new HtmlWebpackPlugin(), // 在打包文件夹中自动生成index.html并引入JS、CSS
        new webpack.optimize.CommonsChunkPlugin({
            name: "bundle", // vendor libs + extracted manifest
            filename: '[name].[chunkhash:8].js'
        }),
        new WebpackMd5Hash(),
        new webpack.optimize.UglifyJsPlugin(), //压缩JS代码；
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new ChunkManifestPlugin({
            filename: "chunk-manifes.json",
            manifestVariable: "webpackManifest"
        })
        
    ]
   
};