const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    target:'node',
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项

    entry: __dirname + '/app/main.js', //唯一入口文件
    output: {
        //path: __dirname + '/public', //打包后的文件存放
        path: __dirname + '/build',
        filename: 'bundle.js' //打包后输出的文件名
    },

    module: {//在配置文件里添加JSON loader
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules!postcss' //感叹号的作用在于使同一文件能够使用不同类型的loader
            }
        ]
    },
    postcss:[
        require('autoprefixer') //调用autoprefixer插件
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template:__dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ],
    devServer: {
        contentBase: './public', // 本地服务器加载页面所在的目录
        colors: true, //终端输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true,//实时刷新
        progress:true // 打包时显示进度
    }
};