const path =  require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry:{
        app:'./src/index.js',
        print:'./src/print.js'
    },
   
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html',
            inject:'body'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    output:{
        filename:'./static/[name].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                 use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            {
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            {
                test:/\.(png|jpg|svg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            outputPath:'static',
                            publicPath:'../images',
                            name:'[name].[ext]?[hash]',
                            useRelativePath:true
                        }
                    }
                ]
            }
        ]
    }
};