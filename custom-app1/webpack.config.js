// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;
const ExternalTemplatesRemotesPlugin = require('external-remotes-plugin');
const deps = require("./package.json").dependencies;


module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    mode: "development",
    target: "web",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app1',
            filename: 'remoteEntry.js',
            remotes:{
                app2:'app2@http://localhost:3002/remoteEntry.js',
            },
            shared:{
                'react':{
                    requiredVersion: deps.react,
                    import: 'react',
                    singleton: true,
                    eager: true,
                },
                'react-dom':{
                    requiredVersion: deps['react-dom'],
                    import: 'react-dom',
                    singleton: true,
                    eager: true,
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
        static: path.join(__dirname, 'dist'),
        port: 3000,
    },
};