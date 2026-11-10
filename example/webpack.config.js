const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pak = require('../package.json');
const root = path.resolve(__dirname, '..');
const modules = path.join(__dirname, 'node_modules');

module.exports = {
  entry: './web/index.js',
  output: {
    path: path.join(__dirname, 'web-build'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.json'],
    alias: {
      'react-native$': path.join(modules, 'react-native-web'),
      'react-native-web': path.join(modules, 'react-native-web'),
      'react': path.join(modules, 'react'),
      'react-dom': path.join(modules, 'react-dom'),
      'react-native-reanimated': path.join(modules, 'react-native-reanimated'),
      [pak.name]: path.join(root, pak.source),
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules\/(?!react-native-reanimated\/)/,
        use: { loader: 'babel-loader', options: { cwd: __dirname } },
      },
      { test: /\.(png|jpe?g|gif|svg|ttf|woff2?)$/, type: 'asset/resource' },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './web/index.html' })],
  devServer: { host: '127.0.0.1', port: 8080, historyApiFallback: true },
};
