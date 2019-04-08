/*
 * @Author: liuxin
 * @Date: 2018-07-27 15:53:57
 * @Last Modified by: liuxin
 * @Last Modified time: 2019-04-08 16:30:53
 */

const path = require('path')

function _import(dir) {
  return require(path.join(__dirname, './node_modules', dir))
}

module.exports = {
  'presets': [
    [
      _import('@babel/preset-env'),
      { 
        // // 用于指定版本
        'targets': {
          'browsers': [
            'last 10 versions',
            'Safari >= 6',
            'not ie < 8',
            'ios >= 7.0',
            'Android >= 4.0'
          ]
        },
        // 模块类型
        'modules': 'commonjs',
        // A way to apply @babel/preset-env for polyfills
        'useBuiltIns': false,
        // 将使用的目标/插件和插件数据版本中指定的版本输出到console.log
        'debug': false
      }
    ]
  ],
  'plugins': [
    _import('@babel/plugin-syntax-dynamic-import'),
    _import('@babel/plugin-transform-runtime'),
    [
      _import('babel-plugin-import'), {
        'libraryName': '',
        'style': false,
        
      }
    ]
  ]
}