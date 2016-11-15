const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: path.resolve(__dirname, 'src', 'client', 'main.tsx'),
    output: {
        filename: path.resolve(__dirname, 'dist', 'bundle.js'),
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/, query: {
                query: {
                    presets: ['es2015', 'react']
                }
            } },
            {
                test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/, query: {
                configFileName: path.resolve(__dirname, 'tsconfig.client.json'),
            } },
            {
                test: /\.json$/, loader: "json-loader"
            },
        ],

        preLoaders: [
            {test: /\.js$/, loader: "source-map-loader"},
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("dev")
            },
            'global': {},
        })
    ]

};
