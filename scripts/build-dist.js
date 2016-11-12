#!/usr/bin/env node

const config = require('../webpack.config.js')
const build = require('./build')

build(config)
