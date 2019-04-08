const chalk = require('chalk')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const packageJson = require('../package.json')

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