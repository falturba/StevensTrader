var fallback = require('express-history-api-fallback');
var path = require('path');
var express = require("express");
var fs = require("fs");
require("./libs/mongoose-init");


route = path.resolve(process.cwd(), "src");
console.log("route path is : "+route);

console.log('server is starting');
var app = express();


/*******************************
 *************  DEV ************
 *******************************/
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');
var compiler = webpack(webpackConfig); 

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, 
    path: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
/******************************/


var port = 4000;
app.listen(port, listening);
function listening(){
	console.log('listening in port '+port);
}

//include all the services
fs.readdirSync(route+'/services').forEach(function(fileName){
	if(fileName.indexOf('.js')>0)
	app.use('/services',require('./services/'+fileName));
})



//include all the routes
// fs.readdirSync(route+'/routes').forEach(function(fileName){
// 	if(fileName.indexOf('.js')>0)
// 	app.use(require('./routes/'+fileName));
// })


//set fullback url to public/index.html
var dirname = path.resolve(); // for fixing empty path problem when using gulp
app.use(express.static(path.join(__dirname, '../public')));
// app.use(fallback('public/index.html', { root: dirname }))
// app.get('*', function (req, res) {
// 	console.log("in....:"+ dirname );
// 	res.sendFile("index.html", {"root": dirname});
// })




