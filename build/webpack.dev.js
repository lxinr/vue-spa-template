const merge = require('webpack-merge')
const webpack = require('webpack')
// html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')

process.env.NODE_ENV = 'development'

module.exports = (env, argv) => {
  return merge(require('./webpack.base'), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      ...config.dev,
      clientLogLevel: "error",
      compress: true,
      // 静默启动
      // quiet: true,
      hot: true,
      // 调试时使用history刷新不出错
      historyApiFallback: true,
      // https://www.webpackjs.com/configuration/stats/#stats
      stats: {
        assets: true,
        builtAt: true,
        children: false,
        chunks: false,
        modules: false
      }
    },
    module: {
    },
    plugins: [
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      // 模块热替换(Hot Module Replacement 或 HMR)
      new webpack.HotModuleReplacementPlugin(),
      // new DashboardPlugin(dashboard.setData),
      new HtmlWebpackPlugin({
        title: '',
        filename: 'index.html',
        template: 'src/template/index.html'
      }),
    ]
  })
}