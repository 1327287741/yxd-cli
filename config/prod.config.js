const baseConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//抽取css样式

module.exports = merge(baseConfig,{
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader',
          publicPath: '../'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'less-loader'],
          publicPath: '../'
        })
      },
    ]
  },
  watch: true,// 监听修改自动打包
  //插件
  plugins:[
    new ExtractTextPlugin({
      filename: "css/[name].css",
    }),
  ],
});