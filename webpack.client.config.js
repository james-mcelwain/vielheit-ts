const path = require('path');

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
            { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/, query: {
                configFileName: path.resolve(__dirname, 'tsconfig.client.json'),
            } },
            { test: /\.json$/, loader: "json-loader" }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" },
        ]
    },
};
