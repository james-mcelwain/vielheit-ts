const path = require('path');

module.exports = {
    target: 'node',
    entry: path.resolve(__dirname, 'src', 'server', 'main.ts'),
    output: {
        filename: path.resolve(__dirname, 'dist', 'index.js'),
    },
    devtool: "source-map",
    libraryTarget: "commonjs",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/, query: {
                query: {
                    presets: ['es2015', 'react']
                }
            } },
            { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/, query: {
                configFileName: path.resolve(__dirname, 'tsconfig.json'),
            } },
            { test: /\.json$/, loader: "json-loader" },
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" },
        ]
    },
    externals: [require('webpack-node-externals')()],
};
