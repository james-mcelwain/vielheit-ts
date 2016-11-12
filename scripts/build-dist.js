#!/usr/bin/env node

const webpack = require('webpack')

const config = require('../webpack.config.js')

const compiler = webpack(config)

const log = (err, stats) => {
    if (err) {
        console.log(err)
    }

    if (stats.compilation && stats.compilation.errors) {
        stats.compilation.errors.forEach(x => {
            console.log(x.message)
        })
    }
}

void function Main() {
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
}()
