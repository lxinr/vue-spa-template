const config = require('../config')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
// 用于将组件内的css分开打包
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLoader = require('./styleLoader')
// 用于将组件内的css分开打包
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 当前项目目录
const projectDir = process.cwd()

function dir(d) {
  return path.join(projectDir, d)
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
      '$assets': dir('src/assets'),
      '@assets': dir('src/assets'),
    },
    modules: ["node_modules"]
  },
  output: {
    filename: `static/js/[name].[hash:${config.hashLength}].js`,
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
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
    new VueLoaderPlugin()
  ]
}