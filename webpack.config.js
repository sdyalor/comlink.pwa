const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WorkerPlugin = require('worker-plugin');

const extensions = ['.js', '.jsx', '.ts', '.tsx','.mjs'];
const babelRc = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          ie: 11
        },
        useBuiltIns: 'entry',
        corejs: 3,
        debug: true
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['babel-plugin-const-enum'],
    ['@babel/plugin-syntax-dynamic-import'],
    [
      '@babel/plugin-proposal-decorators',
      { decoratorsBeforeExport: true }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ['babel-plugin-transform-async-to-promises'],
    ["@babel/plugin-transform-arrow-functions", { "spec": true }],
    ['@babel/plugin-transform-template-literals']
  ]
  // ignore: [
  //   // 'node_modules/proxy-polyfill'
  // ]
};

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|js|mjs)x?$/,
        exclude: [
          /@babel(?:\/|\\{1,2})runtime|core-js/,
          /regenerator-runtime/,
          /proxy-polyfill/
        ],
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: {}
          // },
          // {
          //   loader: 'cache-loader'
          // },
          {
            loader: 'babel-loader',
            options: babelRc
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions
  },
  plugins: [
    new CopyWebpackPlugin([
      // 'images/**',
      // 'node_modules/@webcomponents/webcomponentsjs/**',
      // 'manifest.json'
      // 'index.html'
    ]),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      template: 'index.html'
    }),
    // new WorkboxWebpackPlugin.GenerateSW({
    //   include: ['index.html', 'manifest.json', /\.js$/],
    //   exclude: [/\/@webcomponents\/webcomponentsjs\//],
    //   navigateFallback: 'index.html',
    //   swDest: 'service-worker.js',
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   runtimeCaching: [
    //     {
    //       urlPattern: /\/@webcomponents\/webcomponentsjs\//,
    //       handler: 'staleWhileRevalidate'
    //     },
    //     {
    //       urlPattern: /^https:\/\/fonts.gstatic.com\//,
    //       handler: 'staleWhileRevalidate'
    //     }
    //   ]
    // })
    new WorkerPlugin(
      {
        // disable warnings about "window" breaking HMR:
        globalObject: false
      }
    )

  ]
};
