var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mybundle.js',
    chunkFilename: '[id].js'
  },
  resolve: { // can be imported without .js
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        //loader: 'xxx-loader', use 'use' for more complex config
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              importLoaders: 1, //run 1 loader before css-loader
              modules: true, //enable css-modules
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ["> 1%", "last 2 versions"]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        //name and path store the file
        loader: 'url-loader?limit=8000&name=images/[name].[ext]',
        // loader: 'url-loader',
        // options: {
        //   limit: 8192
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ]
};