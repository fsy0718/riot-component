"use strict";

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const compiler = webpack(config);

const server = new webpackDevServer(compiler, {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: {
        colors: true
    }
});

config.entry.unshift('webpack-dev-server/client?http://locahost:5000', 'webpack/hot/only-dev-server');


server.listen(5000, function(err){
    if(err){
        console.log(err);
    }
    console.log('listening at localhost:5000');
});