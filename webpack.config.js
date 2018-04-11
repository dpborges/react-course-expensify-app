// Load node.js path module
const path = require('path');

// add plugin to extact css files from bundle.js
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Note that entry was able to take a relative path while output and devserver require an 
// absolute path, hence why use path.join node.js function.

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
    
  return  {
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, 'public', 'dist'),
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
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map'  : 'cheap-module-eval-sourcemap',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};