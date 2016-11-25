const path = require('path');
const webpack = require('webpack');

const base = (target) => ({
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    devtool: "source-map",
    libraryTarget: "commonjs",
    resolve: {
        alias: alias,
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/, query: {
                query: {
                    presets: ['es2015', 'react']
                }
            }
            },
            {
                test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/, query: {
                configFileName: path.resolve(__dirname, `tsconfig.${target}.json`),
            }
            },
            {test: /\.json$/, loader: "json-loader"},
        ],
        preLoaders: [
            {test: /\.js$/, loader: "source-map-loader"},
        ]
    },
});

const server = Object.assign(base('server'), {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, 'src', 'server', 'main.ts')
    },
    externals: [require('webpack-node-externals')()],
});

const client = Object.assign(base('client'), {
    entry: {
        client: path.resolve(__dirname, 'src', 'client', 'main.tsx')
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("dev")
            },
            'global': {},
        })
    ]
});

// TODO: Check if this can be removed
var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
    "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});

module.exports = [server, client];
