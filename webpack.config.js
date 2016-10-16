const path = require('path')

module.exports = {
    target: 'node',
    entry: path.resolve(__dirname, 'src', 'main.ts'),
    output: {
        filename: path.resolve(__dirname, 'dist', 'index.js'),
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/, query: {
                configFileName: path.resolve(__dirname, 'tsconfig.json'),
            } },
            { test: /\.json$/, loader: "json-loader" }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" },
        ]
    },
    externals: [require('webpack-node-externals')()],
}