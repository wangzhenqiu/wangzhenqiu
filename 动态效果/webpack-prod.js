const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ClearWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common,{
           devtool:'source-map',
           plugin:[
            new ClearWebpackPlugin['dist'],
            new UglifyJSPlugin({
                sourceMap:true
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV':JSON.stringify('production')
            })

           ],
           optimization:{
            splitChunks:{
                cacheGroups:{
                    commons:{
                        test:/[\\/]node.modules[\\/]/,
                        name:"commom",
                        chunks:"all"
                    }
                }
            }
           }
            });