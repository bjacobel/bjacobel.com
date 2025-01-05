const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { LANGUAGES } = require('./src/constants');
const urlFor = require('./src/services/urlFor');

const isProd = process.env.NODE_ENV === 'production';
const posts = fs.readdirSync('src/posts').map(file => urlFor(`./${file}`));

const wpconfig = {
  entry: {
    main: './src/index.js',
  },
  mode: isProd ? 'production' : 'development',
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  target: isProd ? 'node' : 'web',
  devtool: isProd ? false : 'source-map',
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      // @TODO: This doesn't work right now - probably because of weird require things
      // Convert to import() and then try enabling this.
      // chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          { loader: 'file-loader' },
          { loader: 'image-webpack-loader',
            options: {
              disable: !isProd,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules/wouter')],
        use: 'babel-loader',
      },
      {
        test: /\.ejs$/,
        use: 'ejs-webpack-loader',
      },
      {
        test: /\.md$/,
        use: [
          { loader: 'json-loader' },
          { loader: 'meta-marked-loader' },
        ],
      },
      {
        test: /\.scss$/,
        loader: [
          isProd ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ejs', '.json', '.scss', '.md'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'wouter': 'wouter-preact',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${LANGUAGES.join('|')})$`)  // eslint-disable-line comma-dangle
    ),
    new CopyWebpackPlugin([{
      from: 'src/static',
    }]),
  ],
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    overlay: true,
  },

  performance: {
    maxAssetSize: 350000,
    maxEntrypointSize: 500000,
    hints: isProd ? 'warning' : false,
  },
};

if (!isProd) {
  wpconfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html.ejs',
    }),
    ...wpconfig.plugins,
  ];
} else {
  wpconfig.plugins = [
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
    }),
    new StaticSiteGeneratorPlugin({
      entry: 'main',
      paths: [
        '/',
        '/projects/',
        '/work/',
        '/blog/',
        '/contact/',
        ...posts,
      ],
    }),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
