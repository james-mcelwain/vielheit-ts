#!/usr/bin/env node

const webpack = require('webpack');
const WebpackWatcher = require('webpack-watcher');
const chalk = require('chalk');
const config = require('../webpack.config');
const child_process = require('child_process');

const log = (err, stats) => {
    if (err) {
        console.log(err)
    }

    if (stats.compilation && stats.compilation.errors) {
        stats.compilation.errors.forEach((x, i) => {
            console.log(chalk.yellow.bold(x.file || (x.module && x.module.resource)));
            console.log(x.message
                .replace(chalk.styles.red.open, chalk.styles.gray.close)
                .replace(chalk.styles.red.close, chalk.styles.gray.close))
        })
    }
};

let activeServer = null;

void function Main() {
    const compiler = webpack(config);

    const [,, watch] = process.argv;

    if (watch === '--watch' || watch === '-w') {
        const startServer = () => child_process.execSync('npm start', { stdio: [0, 1, 2] });
        const watcher = new WebpackWatcher(compiler);

        return watcher.onceDone(function(err, stats) {
            if (activeServer) activeServer.kill();
            activeServer = startServer();
        })
    }

    compiler.run(log)
}();

