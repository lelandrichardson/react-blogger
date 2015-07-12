var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    entry: {
        Client: './src/Client',
        Admin: './src/Admin'
    },
    devServer: {
        contentBase: './build'
    },
    output: {
        path: path.join(__dirname, 'build', 'client'),
        publicPath: 'build',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js',
        sourceMapFilename: 'debugging/[file].map'
    },
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
            //{
            //    test: /\.(less|css|scss)$/,
            //    loader: "style!css!less"
            //},
            {
                test: /\.(less|css|scss)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!less")
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ],
        noParse: /\.min\.js/
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false
        }),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css"),
    ],
    externals: {
        "react": "React",
        //"codemirror": "CodeMirror",
        "moment": "moment",
        "immutable": "Immutable"
    }
};