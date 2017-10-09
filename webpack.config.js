const path = require('path');
//var devServerPort = require('./src/config/index.config.js').serverConfig.webpackDevServerPort;
var devServerPort = 8080;
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
// note the different casing here for variables
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack/isomorphic.config'));
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: {
        main: [
            'webpack-hot-middleware/client?http://localhost:' + devServerPort,
            'webpack/hot/only-dev-server',
            './src/app',
            './src/scss/main.scss'


        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:' + '3000' + '/dist/'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(svg|eot|ttf|woff|woff2)?$/, loader: 'url-loader' },
            { test: /\.scss$/, exclude: /node_modules/, use: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] }) },
            { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader', options: { limit: 10240 } }

        ]
    },
    devtool: "source-map",
    plugins: [

        new ExtractTextPlugin({
            disable: false,
            filename: "[name].css",
            allChunks: true
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        webpackIsomorphicToolsPlugin.development(),
        new webpack.HotModuleReplacementPlugin(),

    ],
    resolve: {
        extensions: ['.js']
    }
};