const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { LANGUAGES } = require('./src/constants');
const urlFor = require('./src/services/urlFor');

const isProd = process.env.NODE_ENV === 'production';
const posts = fs.readdirSync('src/posts').map(file => urlFor(`./${file}`));

const devCssConfig = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
  { loader: 'sass-loader' },
];

const prodCssConfig = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    { loader: 'css-loader' },
    { loader: 'sass-loader' },
  ],
});

const wpconfig = {
  entry: {
    main: './src/index.js',
  },
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
        test: /\.woff(2)?(\?[a-z0-9=]+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 64000,
          },
        },
      },
      {
        test: /\.(ttf|eot|svg|jpg|png)(\?[a-z0-9=]+)?$/,
        use: isProd ? 'file-loader' : 'url-loader',
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
        use: isProd ? prodCssConfig : devCssConfig,
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
    new webpack.LoaderOptionsPlugin({
      debug: !isProd,
    }),
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
    new ExtractTextPlugin('[name].css'),
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
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
