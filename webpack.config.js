const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');


module.exports = (env, options) => {
    console.log('Running in ' + options.mode + ' mode.');
    if (options.mode === 'production') {
        require('dotenv').config({path: './.env.production.local'});
    } else {
        require('dotenv').config({path: './.env.development.local'});
    }
    return {
        entry: './src/main.js',
        module: {
            rules: [
                { test: /\.js$/, use: 'babel-loader' },
                { test: /\.vue$/, use: 'vue-loader' },
                { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
                { 
                    test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                    use: ['file-loader'],
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'API_URL': JSON.stringify(process.env.API_URL),
                    'AGENT_UUID': JSON.stringify(process.env.AGENT_UUID),
                }
            }),
            new VueLoaderPlugin(),
        ]
    }
};
