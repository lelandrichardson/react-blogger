var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    entry: {
        App: './src/App'
    },
    devServer: {
        contentBase: './build'
    },
    output: {
        path: path.join(__dirname, 'build'),
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
                        'minification.propertyLiterals',
                        'es7.decorators'
                    ]
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ],
        noParse: /\.min\.js/
    },
    resolve: {
        modulesDirectories: ['src/Components', 'src/Views', 'src/Styles', 'node_modules'],
        extensions: ['', '.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};