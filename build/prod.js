let startTime = new Date()
process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const prodConfig = require('./webpack.prod')
const config = require('../config')
const {
  setVersion,
  copyDll
} = require('./util')

const spinner = ora('building for production... \n')
spinner.start()

console.log(chalk.magenta(`--------- clean ${config.dist} --------- \n`))
// 先删除dist
// rm(config.dist, err => {
//   if(err) throw err
//   console.log(chalk.yellowBright(`--------- 开始构建 --------- \n`))
//   let buildTime = new Date()
//   try {
//     copyDll()
//     webpack(prodConfig(), (err, stats) => {
//       spinner.stop()
//       if(err) throw err

//       // 用于生成目录树
//       process.stdout.write(stats.toString({
//         colors: true,
//         modules: false,
//         children: false,
//         chunks: false,
//         chunkModules: false
//       }) + '\n\n')

//       if(stats.hasErrors()) {
//         console.log(chalk.red('--------- 构建出错 --------- \n'))
//         process.exit(1)
//       }

//       setVersion()

//       console.log(chalk.cyan(` 构建完成，运行总用时约 ${(new Date() - startTime) / 1000} s，构建用时约 ${(new Date() - buildTime) / 1000} s \n`))
//       console.log(chalk.blueBright('--------- 构建结束了， 恭喜恭喜 ---------'))
//     })
//   } catch(e) {
//     console.error(e)
//   }
// })

console.log(chalk.yellowBright(`--------- 开始构建 --------- \n`))
let buildTime = new Date()
try {
  // copyDll()
  webpack(prodConfig(), (err, stats) => {
    spinner.stop()
    if (err) throw err

    // 用于生成目录树
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('--------- 构建出错 --------- \n'))
      process.exit(1)
    }

    setVersion()

    console.log(chalk.cyan(` 构建完成，运行总用时约 ${(new Date() - startTime) / 1000} s，构建用时约 ${(new Date() - buildTime) / 1000} s \n`))
    console.log(chalk.blueBright('--------- 构建结束了， 恭喜恭喜 ---------'))
  })
} catch (e) {
  console.error(e)
}