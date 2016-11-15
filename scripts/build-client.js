#!/usr/bin/env node

const build = require('./build');

const path = require('path');

build(require('../webpack.client.config.js'));

const JS = {
    entry: path.resolve(__dirname, '..', 'dist', 'client', 'main.js'),
    output: {
        filename: path.resolve(__dirname, '..', 'dist', 'bundle.js'),
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }};
