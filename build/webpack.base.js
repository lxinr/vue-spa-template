const config = require('../config')
const path = require('path')
const webpack = require('webpack')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const StyleLoader = require('./styleLoader')
// 当前项目目录
const projectDir = process.cwd()

function dir(d) {
  return path.join(projectDir, d)
}

process.env.DIST_MODULE = config.disModule

const clientEnvironment = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.DIST_MODULE': JSON.stringify(process.env.DIST_MODULE)
}

module.exports = {
  entry: {
    app: './src/index.js'
  },
  stats: {
    colors: true
  },
  resolve: {
    // // 用于查找模块的目录
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx', '.css', '.scss', '.vue'],
    // // 模块别名列表
    alias: {
      vue$: 'vue/dist/vue.js',
      '$src': dir('src'),
      '@src': dir('src'),
      '$assets': dir('src/assets')
    },
    modules: ["node_modules"]
  },
  output: {
    filename: `static/js/[name].[hash:${config.hashLength}].js`,
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件
    // https://www.webpackjs.com/configuration/module/#module-noparse
    noParse: [/static/],
    rules: [
      // 增加对ts的支持
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            logLevel: 'warn'
          }
        }]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(js|vue|ts)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [ config.src ],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitError: true,
          failOnError: true
        }
      },
      // 在dev环境下使用mini-css-extract-plugin会影响HMR，具体表现在修改组件内的style时不会触发热更新
      {
        test: /\.css$/ig,
        use: StyleLoader()
      },
      {
        test: /\.scss$/ig,
        use: StyleLoader('sass-loader')
      },
      {
        test: /\.pug$/,
        oneOf: [
          // 用于在vue模板中使用lang="pug"
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // 用于在js中import
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `static/img/[name].[hash:${config.hashLength}].[ext]`
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `static/font/[name].[hash:${config.hashLength}].[ext]`
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // DefinePlugin 允许创建一个在编译时可以配置的全局常量
    // https://webpack.docschina.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      ...clientEnvironment
    }),
    // 2019-04-14 移除该项，原因：无实际用途，且影响构建效率
    // 将静态资源拷贝到dist
    // new CopyWebpackPlugin([
    //   {
    //     from: config.staticDir,
    //     to: path.join(config.dist, config.disModule, 'static')
    //   }
    // ])
  ]
}