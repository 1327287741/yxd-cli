const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PAGE_PATH = path.resolve(__dirname,'../src/')

const entries = function(){
  let entryFiles = glob.sync(PAGE_PATH+'/js/*.js')
  let map = {}
  console.log(entryFiles)
  entryFiles.forEach(filePath=>{
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1,filePath.lastIndexOf('.'))
    //多目录下有多个js文件进行过滤
    let arr = filePath.split('\/')
    if(arr[arr.length-1].split('.')[0]===filename){
      map[filename] = filePath
    }
    console.log(filename,filePath,arr[arr.length-1].split('.')[0])
  })

  console.log(map)
  return map
}

const htmlPlugins=function(isBuild){
  let entryHtml = glob.sync(PAGE_PATH+'/*.html')
  if (isBuild){
    entryHtml
  }
  let arr = []
  entryHtml.forEach(filePath=>{
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      filename:filename+'.html',
      template:path.resolve(PAGE_PATH,filename+'.html'),
      chunks:[filename, 'common'],
      inject:true,
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  console.log(arr)
  return arr
}

module.exports={
  entries,
  htmlPlugins
}
