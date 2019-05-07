const config = require('../config')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  // 你想要打包的模块的数组
  entry: {
    vendor: [path.join(__dirname, '../src', 'dll.js')]
  },
  resolve: {
    // // 模块别名列表
    alias: {
      vue$: 'vue/dist/vue.js'
    }
  },
  output: {
    path: path.join(config.dist, config.disModule, 'static/dll'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_[hash]',
    libraryTarget: 'this'
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.join(__dirname, '../src'),
      path: path.join(config.dist, config.disModule, 'static', 'dll/[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
};