const path =  require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:{
        app:'./src/index.js',
        print:'./src/print.js'
    },
    devtool:'inline-source-map',
    devSever:{contentBase:'./dist'},
    plugins:[
        new HtmlWebpackPlugin({
            title:'999',
            filename:'index.html',
            template:'./src/index.html',
            inject:'body'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    output:{
        filename:'[name].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.scss/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(png|jpg|svg|gif)$/,
                use:[
                    'file-loader'
                ]
            }
        ]
    }
};