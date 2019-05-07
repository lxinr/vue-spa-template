const path = require('path')
const merge = require("webpack-merge")
const webpack = require('webpack')
// 用于将组件内的css分开打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// html文件处理
const HtmlWebpackPlugin = require('html-webpack-plugin')
// https://makeup1122.github.io/2018/10/12/webpack-UglifyJS-issue/
// ES6代码压缩
const TerserPlugin = require('terser-webpack-plugin')
// css压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
// 构建时的进度条样式 https://github.com/clessg/progress-bar-webpack-plugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const chalk = require('chalk')

const config = require('../config')
// 当前项目目录
const projectDir = process.cwd()

process.env.NODE_ENV = 'production'

function dir(d) {
  return path.join(projectDir, d)
}

module.exports = (env, argv) => {
  return merge(require("./webpack.base"), {
    mode: 'production',
    output: {
      hashDigestLength: config.hashLength,
      chunkFilename: 'static/js/[name].[hash].js',
      path: config.build.assetsRoot,
      publicPath: config.build.assetsPublicPath,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `static/css/[name].[hash:${config.hashLength}].css`
        // chunkFilename: `css/[id].css`
      }),
      new HtmlWebpackPlugin({
        title: '',
        useDll: config.useDll,
        dllPath: `${config.disModule ? '/' + config.disModule : ''}/static/dll/vendor.dll.js`,
        filename: config.build.index,
        template: 'src/template/index.html',
        dist: dir('dist'),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        chunksSortMode: 'dependency'
      }),
      new ProgressBarPlugin({
        format: '[:bar] ' + chalk.green.bold(':percent') + ' :msg'
      }),
      // new CopyWebpackPlugin([
      //   {
      //     from: config.staticDir,
      //     to: path.join(config.dist, config.disModule, 'static')
      //   }
      // ]),
      // new webpack.DllReferencePlugin({
      //   // 跟dll.config里面DllPlugin的context一致
      //   context: path.join(__dirname, '..'),
      //   // dll过程生成的manifest文件
      //   manifest: require(path.join(config.static, 'dll', 'vendor-manifest.json'))
      // })
    ].concat(
      ...(config.useDll ? [
        new webpack.DllReferencePlugin({
          // 跟dll.config里面DllPlugin的context一致
          context: path.join(__dirname, '../src'),
          // dll过程生成的manifest文件
          // path.join(__dirname, '..', 'src/static', 'dll/vendor-manifest.json')
          manifest: require(path.join(config.dist, config.disModule, 'static/dll', 'vendor-manifest.json'))
        })
      ] : []),
      ...(process.env.ANALYZE ? [new(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()] : [])), // 判断是否生成构建报告,
    optimization: {
      minimize: true,
      minimizer: [
        // https://github.com/webpack-contrib/terser-webpack-plugin
        new TerserPlugin({
          parallel: true,
          sourceMap: false,
          cache: true,
          terserOptions: {
            warnings: false,
            compress: {
              drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
              collapse_vars: true, // 内嵌定义了但是只用到一次的变量
              reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0, // This is example is too small to create commons chunks
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    }
  })
}