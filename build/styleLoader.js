// 用于将组件内的css分开打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'

// 在dev环境下使用mini-css-extract-plugin会影响HMR，具体表现在修改组件内的style时不会触发热更新
module.exports = (loader = []) => {
  let loaders = [
    isDev ? {
      loader: 'vue-style-loader'
    } : {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader'
    }
  ]
  if (loader && loader.length) {
    loaders = loaders.concat(loader)
  }

  return loaders
}