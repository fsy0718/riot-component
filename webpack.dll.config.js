"use strict";

const webpack = require('webpack');
const path = require('path');

const vendors = [
    'react',
    'react-dom'
];

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    entry: {
        'lib': vendors
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'dist','manifest.json'),
            name: '[name]_library'
        })
    ]
}