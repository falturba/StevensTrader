process.noDeprecation = true; // for close warning in webpack 2.2.1 [https://github.com/vuejs/vue-loader/issues/666]
var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/index.html',
  filename: 'index.html',
  inject: 'body'
});

var LiveReloadPlugin = require('webpack-livereload-plugin');
var options = {appendScriptTag:true};

module.exports = {
  entry: [
    './views/index.js',
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
        include: path.join(__dirname,'views'),
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: ['transform-class-properties','transform-decorators-legacy']
        }
      },{
        test: /\.scss$/,
        include: path.join(__dirname,'views'),
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },{ 
        test: /\.(png|jpg)$/, 
        include: path.join(__dirname,'views'),
        loader: 'url-loader?limit=8192' 
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'public/'),
    filename: "/index_bundle.js"
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new LiveReloadPlugin(options)
  ]
}