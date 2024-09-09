const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const glob = require('glob');

module.exports = {
    entry: glob.sync('./src/**/*.js').map(file => `./${file}`),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'light-api.js',
        library: {
            type: 'module',
        },
    },
    experiments: {
        outputModule: true,
    },
    optimization: {
        minimize: false, // Disable minification to preserve code structure
    },
    resolve: {
        extensions: ['.js'], // Automatically resolve certain extensions
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'), // You can alias directories for cleaner imports
        },
    },
    target: ['web', 'es6'],
    mode: 'production',
    plugins: [new ESLintPlugin({
        extensions: ['js'],
        exclude: ['node_modules', 'dist'],
    })],
};