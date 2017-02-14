var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  entry: [
    './views/index.js',
    "webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr&timeout=2000&overlay=false'"
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: ['transform-class-properties','transform-decorators-legacy']
        }
      },{
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
      },{ 
          test: /\.(png|jpg)$/, 
          loader: 'url-loader?limit=8192' }
    ]
  },
  output: {
    path: path.join(__dirname, 'public/build'),
    publicPath:"http://localhost:4000/build/",
    filename: "index_bundle.js"
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}