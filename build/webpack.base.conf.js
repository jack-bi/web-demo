'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
const webpack = require('webpack')
const entryList = require('../config/entry')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: entryList,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '$COM': resolve('src/common-bundle/common'), //定義共用js
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        test: /\.jade$/,
        loader: "jade"
      },
      {
        test: /\.pug$/,
        loader: 'pug'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('image/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  // externals: {
  //     jquery: 'jQuery',
  // },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common', // 指定公共 bundle 的名称。
        filename: 'static/js/common.js',
        minChunks: Infinity
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = vuxLoader.merge(webpackConfig, {
  options: { showVuxVersionInfo: false },
  cache: true, // #2优化
  plugins: [
    'vux-ui',
    {name: 'less-theme', path: 'src/style/theme.less'},
    new webpack.optimize.CommonsChunkPlugin({ // #3优化 效果明显
      async: 'shared-module',
      minChunks: (module, count) => (
        count >= 2    // 当一个模块被重复引用2次或以上的时候单独打包起来。
      )
    })]
})
