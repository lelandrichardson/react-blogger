var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PROD = process.env.NODE_ENV == "production";

var plugins = [
    new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEV__: !PROD
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css")
];
if (PROD) {
    plugins.concat([
        new webpack.optimize.UglifyJsPlugin({ output: { comments: false } })
    ]);
}

module.exports = {
    cache: !PROD,
    debug: !PROD,
    profile: !PROD,
    bail: PROD,
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
                        'minification.propertyLiterals'
                    ]
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