import path from 'path';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { phenomicLoader } from 'phenomic';

export default (config = {}) => {
  const srcPath = path.join(__dirname, 'src');
  const destinationPath = path.join(__dirname, config.destination);
  const postcssPlugins = () => [
    require('stylelint')(),
    require('postcss-reporter')(),
    ...!config.production ? [
      require('postcss-browser-reporter')(),
    ] : [],
  ];
  const postcssLoader = {
    loader: 'postcss-loader',
    options: { plugins: postcssPlugins }
  };

  return {
    ...config.dev && {
      devtool: '#cheap-module-eval-source-map',
    },
    module: {
      noParse: /\.min\.js/,
      rules: [
        // *.md => consumed via phenomic special webpack loader
        // allow to generate collection and rss feed.
        {
          // phenomic requirement
          test: /\.md$/,
          loader: phenomicLoader,
          query: {
            context: path.join(__dirname, config.source),
            // plugins: [
            //   ...require('phenomic/lib/loader-preset-markdown').default,
            // ],
            // see https://phenomic.io/docs/usage/plugins/
          },
        },
        // *.json => like in node, return json
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        // *.js => babel + eslint
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'scripts'),
            path.resolve(__dirname, 'src'),
          ],
          loaders: [
            'babel-loader?cacheDirectory',
            'eslint-loader' + (config.dev ? '?emitWarning' : ''),
          ],
        },
        // *.css => CSS Modules
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  localIdentName: (
                    config.production
                    ? '[hash:base64:5]'
                    : '[path][name]--[local]--[hash:base64:5]'
                  ),
                },
              },
              postcssLoader
            ],
          }),
        },
        // copy assets and return generated path in js
        {
          test: /\.(html|ico|jpe?g|png|gif|svg$)$/,
          loader: 'file-loader',
          query: {
            name: '[path][name].[hash].[ext]',
            context: path.join(__dirname, config.source),
          },
        }
      ],
    },

    plugins: [
      new ExtractTextPlugin({
        filename: '[name].[hash].css',
        disable: config.dev,
      }),
      ...config.production && [
        // DedupePlugin does not work correctly with Webpack 2, yet ;)
        // https://github.com/webpack/webpack/issues/2644
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(
          { compress: { warnings: false } }
        ),
        new CopyWebpackPlugin([
          {
            from: path.join(srcPath, 'keybase.txt'),
            to: path.join(destinationPath, 'keybase.txt'),
          }
        ])
      ]
    ],
    output: {
      path: destinationPath,
      publicPath: config.baseUrl.pathname,
      filename: '[name].[hash].js',
    },
    resolve: {
      alias: {
        '~': srcPath
      },
      extensions: [ '.js', '.json' ]
    },
  };
};
