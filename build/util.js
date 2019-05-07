const chalk = require('chalk')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const packageJson = require('../package.json')
const { copySync } = require('fs-extra')
const path = require('path')
const config = require('../config')
exports.setVersion = async () => {
  const update = packageJson.config.updateVersion
  const vers = packageJson.version.split('.')
  if(update) {
    vers[vers.length - 1] = Number(vers[vers.length - 1]) + 1
    const { stdout, stderr } = await exec(`yarn version --new-version ${vers.join('.')}`)
    if(stdout) {
      console.log(chalk.blueBright(`${stdout} \n`))
    }
    if(stderr) {
      console.log(chalk.red(`${stderr} \n`))
    }
  }
}

exports.copyDll = () => {
  console.log(chalk.yellowBright(`--------- 开始copyDll --------- \n`))
  let buildTime = new Date()
  if(!config.useDll) return
  copySync(path.join(config.staticDir, 'dll'), path.join(config.dist, config.disModule, 'static', 'dll'))
  console.log(chalk.cyan(` 用时约 ${(new Date() - buildTime) / 1000} s \n`))
}