const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Babel
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
      // SCSS
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      // CSS
      {
          test: /\.css$/,
          use: [
              'style-loader',
              'css-loader',
          ],
      },
    ],
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
    extensions: ['*', '.js', '.css', '.scss'],
  },
  plugins: [
    // Sticky
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      hash: true,
    }),
    // Copy assets
    new CopyWebpackPlugin([
        {
          from: 'src/assets/*.jpg',
          to: 'assets/',
          flatten: true,
        },
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
    watchContentBase: true,
    hot: true,
    inline: true,
  },
};
