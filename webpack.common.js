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
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/react',{
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        },
                        '@babel/preset-typescript'
                    ],
                }
            },
            {
                test: /\.css$/,
                use: [],
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