var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/Server.js',
    target: 'node',
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
                        'utility.inlineEnvironmentVariables',
                        'minification.propertyLiterals',
                        'minification.deadCodeElimination'
                    ]
                }
            },
            {
                test: /AsyncProps\.js$/,
                loader: 'babel',
                query: {
                    optional: [
                        'runtime',
                        'es7.decorators',
                        'es7.classProperties',
                        'es7.objectRestSpread',
                        'es7.comprehensions',
                        'es7.functionBind',
                        'utility.inlineEnvironmentVariables',
                        'minification.propertyLiterals',
                        'minification.deadCodeElimination'
                    ]
                }
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true
        }),
        //new webpack.optimize.UglifyJsPlugin(),
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin('require("source-map-support").install();',
            { raw: true, entryOnly: false })
    ],
    devtool: 'sourcemap'
};