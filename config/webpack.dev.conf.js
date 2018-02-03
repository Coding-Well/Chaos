const webpack = require('webpack') // 引入webpack
const opn = require('opn') // 打开浏览器
const merge = require('webpack-merge') // webpack配置文件合并
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf.js') // 基础配置
const webpackFile = require('./webpack.file.conf') // 文件路径配置

const config = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(webpackFile.devDirectory),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name]-[id].js',
        publicPath: ''
    },
    plugins: [
        /*设置开发环境*/
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        /*设置热更新*/
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                include: [
                    path.resolve(__dirname, '../src'),
                    path.resolve(__dirname, '../entry')
                ],
                exclude: [path.resolve(__dirname, '../node_modules')]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    /*设置api转发*/
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        inline: true,
        contentBase: path.resolve(webpackFile.devDirectory),
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: [
            {
                context: [
                    '/api/**', '/u/**'
                ],
                target: 'http://127.0.0.1:3000',
                secure: false
            }
        ],
        /*换气浏览器，并打开本项目地址*/
        after() {
            opn('http://localhost:' + this.port)
        }
    }
})

module.exports = config
