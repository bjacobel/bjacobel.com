const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { LANGUAGES } = require('./src/constants');
const { urlFor } = require('./src/services/requireAll');

const isProd = process.env.NODE_ENV === 'production';
const posts = fs.readdirSync('src/posts').map(file => urlFor(`./${file}`));

const wpconfig = {
  entry: {
    main: [
      './src/index.js',
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  target: isProd ? 'node' : 'web',
  debug: !isProd,
  devtool: isProd ? null : 'source-map',
  module: {
    loaders: [
      {
        test: /\.woff(2)?(\?[a-z0-9=]+)?$/,
        loader: 'url?limit=64000',
      },
      {
        test: /\.(ttf|eot|svg|jpg|png)(\?[a-z0-9=]+)?$/,
        loader: isProd ? 'file' : 'url',
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.ejs$/,
        loader: 'ejs',
      },
      {
        test: /\.md$/,
        loader: 'json!meta-marked',
      },
      {
        test: /\.scss$/,
        loader: isProd ?
          ExtractTextPlugin.extract('style', 'css!sass') :
          'style!css?sourceMap!sass',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.ejs', '.json', '.scss', '.md'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${LANGUAGES.join('|')})$`),
    ),
    new CopyWebpackPlugin([{
      from: 'src/static',
    }]),
  ],
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
  },
};

if (!isProd) {
  wpconfig.entry.main = [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    ...wpconfig.entry.main,
  ];

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
    new StaticSiteGeneratorPlugin('main', ['/', '/projects/', '/work/', '/blog/', '/contact/', ...posts]),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    ...wpconfig.plugins,
  ];
}

module.exports = wpconfig;
