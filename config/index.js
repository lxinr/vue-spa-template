const path = require('path')
const DIST_MODULE = ''

function base() {
  const args = [path.resolve(__dirname, '../')].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

const paths = {
  SRC: 'src',
  OUT_DIR: 'dist',
  TEST: 'test'
}

const environment = {
  disModule: DIST_MODULE,
  dev: {
    // Paths
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, `../dist/${DIST_MODULE}`, 'index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, `../dist/${DIST_MODULE}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: `/${DIST_MODULE}${DIST_MODULE && '/'}`
  }
}

module.exports = {
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  src: base.call(null, paths.SRC),
  dist: base.call(null, paths.OUT_DIR),
  assets: base.call(null, paths.SRC + '/assets'),
  // static: base.call(null, paths.OUT_DIR + '/static'),
  // staticDir: base.call(null, 'static'),
  hashLength: 8,
  ...environment
}