const path = require("path")

module.exports = {
    entry: {
        home: "./client/src/index.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'server/static/scripts')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/react',{
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        }
                    ],
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
                exclude: /node_modules/
            }
        ]
    },

    devServer: {
        contentBase : path.join (__dirname,'public'),
        historyApiFallback : true
    },
      
    devtool: 'source-map'
}