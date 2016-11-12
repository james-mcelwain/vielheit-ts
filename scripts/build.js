const webpack = require('webpack')
const chalk = require('chalk')

const log = (err, stats) => {
    if (err) {
        console.log(err)
    }

    if (stats.compilation && stats.compilation.errors) {
        stats.compilation.errors.forEach((x, i) => {
            console.log(chalk.yellow.bold(x.module && x.module.resource))
            console.log(x.message
                        .replace(chalk.styles.red.open, chalk.styles.gray.close)
                        .replace(chalk.styles.red.close, chalk.styles.gray.close))
        })
    }
}

module.exports = function Main(config) {
    const compiler = webpack(config)

    let [,, watch] = process.argv

    if (watch === '--watch' || watch === '-w') {
        return compiler.watch({
            aggregateTimeout: 300,
            poll: false,
        }, (err, stats) => {
            log(err, stats)
        })
    }

    compiler.run(log)
}
