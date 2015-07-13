var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var PROD = process.env.NODE_ENV == "production";

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    cache: !PROD,
    debug: !PROD,
    profile: !PROD,
    bail: PROD,
    target: 'node',
    entry: './src/Server.js',
    devtool: 'sourcemap',
    output: {
        path: path.join(__dirname, 'build', 'server'),
        filename: 'server.js'
    },
    externals: nodeModules,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    optional: [
                        'runtime',
                        'es7.decorators',
                        'es7.classProperties',
                        'es7.objectRestSpread',
                        'es7.comprehensions',
                        'es7.functionBind',
                        'minification.propertyLiterals'
                    ]
                }
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true,
            __DEV__: !PROD
        }),
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin('require("source-map-support").install();',
            { raw: true, entryOnly: false })
    ]
};