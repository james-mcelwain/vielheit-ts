const webpack = require('webpack')

const config = require('../webpack.config.js')

const compiler = webpack(config)

const log = (err, stats) => {
    if (err) {
        console.log(err)
    }

    if (stats.compillation && stats.compillation.errors) {
        console.log(stats.compillation.errors)
    }
}

void function Main() {
    let [,, watch] = process.argv

    if (watch === '--watch' || watch === '-w') {
        return compiler.watch({
            aggregateTimeout: 300,
            poll: false,
        }, (err, stats) => {
            logger(err, stats)
        })
    }

    compiler.run(log)
}()
