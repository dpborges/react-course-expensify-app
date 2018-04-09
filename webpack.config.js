// Load node.js path module
const path = require('path');

//  Note that entry was able to take a relative path while output and devserver require an 
// absolute path, hence why use path.join node.js function.

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                loader: 'babel-loader',
                test:    /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                    ]
            }
        ]

    },
    devtool: 'cheap-module-eval-sourcemap',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
}