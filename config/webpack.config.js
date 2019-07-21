const utils = require('./utils')
const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports={
    entry:utils.entries(),
    output:{
        filename:'js/[name].js',
        path:path.resolve(__dirname,'../dist/'),
        publicPath: './'
    },
    // resolve: {
    //     alias: {
    //         'js': path.resolve(__dirname, '../src/modules/js')
    //     },
    // },
    module: {
        rules:[
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            // {把这里注释掉就html-loader模板语法就可使用
            //     test: /\.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attrs: [':data-src']
            //         }
            //     }
            // }
        ]
    },
    plugins:[
    ].concat(utils.htmlPlugins())
}