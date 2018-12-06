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
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  target: isProd ? 'node' : 'web',
  devtool: isProd ? false : 'source-map',
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
        include: path.join(__dirname, 'src'),
        use: 'babel-loader',
      },
      {
        test: /\.ejs$/,
        use: 'ejs-loader',
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
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
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
      filename: '[name].css',
    }),
    new StaticSiteGeneratorPlugin(
      'main',
      [
        '/',
        '/projects/',
        '/work/',
        '/blog/',
        '/contact/',
        ...posts,
      ]  // eslint-disable-line comma-dangle
    ),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
