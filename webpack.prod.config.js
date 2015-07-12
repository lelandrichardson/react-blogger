var webpack = require("webpack");

var config = require('./webpack.config');

config.bail = true;
config.debug = false;
config.profile = false;

config.output = {
    path: config.output.path,
    publicPath: config.output.publicPath,
    filename: '[name].js'
};

config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ output: { comments: false } })
]);

module.exports = config;