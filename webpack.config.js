var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  entry: [
    './views/index.js'
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
    path: __dirname + '/public',
    filename: "index_bundle.js"
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [HTMLWebpackPluginConfig]
}