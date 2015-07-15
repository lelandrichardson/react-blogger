var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require('stats-webpack-plugin');
var ISPROD = process.env.NODE_ENV == "production";
var ISDEV = !ISPROD;

var plugins = [
    new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEV__: ISDEV,
        "process.env.IS_BROWSER": true
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css")
];
if (ISPROD) {
    plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ output: { comments: false } })
    );
}
//if (ISDEV) {
//    plugins.push(
//        new StatsPlugin('webpack.stats.json', {
//            chunkModules: true,
//            timings: true,
//            modules: true,
//            chunksSort: 'size',
//            modulesSort: 'size'
//        })
//    );
//}

module.exports = {
    cache: ISDEV,
    debug: ISDEV,
    profile: ISDEV,
    bail: ISPROD,
    target: "web",
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
        publicPath: 'http://localhost:9090/assets/',
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
                        'minification.propertyLiterals'
                    ],
                    loose: 'all'
                }
            },
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
    plugins: plugins,

    externals: {
        "react": "React",
        //"codemirror": "CodeMirror",
        "moment": "moment",
        "immutable": "Immutable"
    }
};