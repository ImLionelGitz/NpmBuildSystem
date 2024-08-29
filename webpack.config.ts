import { Configuration } from "webpack"
import * as HtmlPlugin from 'html-webpack-plugin'
import { resolve } from 'path'

var config: Configuration = {
    entry: './src/main.ts',

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [resolve('node_modules')]
    },

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    output: {
        filename: '[name].bundle.js',
        chunkFilename: './chunks/[contenthash].js',
    },

    plugins: [
        new HtmlPlugin()
    ]
}

export default config