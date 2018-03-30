const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common,{
                plugins:[
                    new ExtractTextPlugin({
                        filename:'./static/css/styles.css'
                    })],
                    optimization:{
                        runtimeChunk:{
                            name:"manifest"
                        },
                        splitChunks:{
                            cacheGroups:{
                                commons:{
                                    test:/[\\/]node_modules[\\/]/,
                                    name:"common",
                                    chunks:"all"
                                }
                            }
                        }
                    }
                                        ]
            });