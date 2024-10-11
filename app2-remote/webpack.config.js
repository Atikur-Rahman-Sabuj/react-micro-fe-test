// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const ExternalTemplatesRemotesPlugin = require('external-remotes-plugin');
const deps = require("./package.json").dependencies;
const { app2Module } = require("../appConfig");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new ModuleFederationPlugin({
            name: app2Module.name,
            filename: app2Module.fileName,
            exposes:{
                "./Comp": "./src/Comp",
                "./CounterContext": "./src/CounterContext"
            },
            shared:{
                'react':{
                    requiredVersion: deps.react,
                    import: 'react',
                    shareKey: "react",
                    shareScope: "default",
                    singleton: true,
                },
                'react-dom':{
                    requiredVersion: deps['react-dom'],
                    import: 'react-dom',
                    singleton: true,
                },
            }
        }),
        new ExternalTemplatesRemotesPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        port: app2Module.port,
    },
};