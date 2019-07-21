const baseConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(baseConfig,{
  devServer:{
    //设置基本目录结构
    contentBase: path.join(__dirname, "../src"),
    //服务器的IP地址，可以使用IP也可以使用localhost
    host:'localhost',
    //服务端压缩是否开启
    compress:true,
    //配置服务端口号
    port:8080,
    hot: true,
    inline: true,
    // open:true,//自动打开浏览器
    compress:true,
    progress:true,//打包的时候显示进度条
  },
  module:{
          rules: [
              {
                  test: /\.css$/,
                  use: ['style-loader', 'css-loader']
              },
              {
                  test: /\.less$/,
                  use: ['style-loader', 'css-loader', 'less-loader'],
                  // loader: "style-loader!css-loader!less-loader!"
              },
          ]
  },
  //插件
  plugins:[
      new webpack.HotModuleReplacementPlugin()
  ],
});