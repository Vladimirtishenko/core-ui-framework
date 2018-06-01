const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './core.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'core.min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
         test: /\.styl$/, 
         loader: ExtractTextPlugin.extract({ fallback: 'style-loader', 
              use: [
              'css-loader?minimize!',
              {
                  loader: 'postcss-loader',
                  options: {
                      plugins: function () {
                          return [autoprefixer()]
                      },
                      sourceMap: 'inline'
                  }
              },
              'stylus-loader'
              ]
          }) 
      },
      {
          test: /\.(png|woff|woff2|otf|eot|ttf|svg|jpg|jpeg)$/, 
          loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("core.min.css"),
  ],
  mode: 'production'
};