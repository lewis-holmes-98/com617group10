const webpack = require('webpack');
const path = require('path');

const port = process.env.PORT || 3000;
var APP_DIR = path.resolve(__dirname, './conponents');
var BUILD_DIR = path.resolve(__dirname, './dist')

const config = {
  entry: [
    'react-hot-loader/patch',
    APP_DIR + '/main.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    //publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCase',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: '/index.html',
    //   favicon: 'public/favicon.ico'
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};

module.exports = config;