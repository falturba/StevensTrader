var fallback = require('express-history-api-fallback');
var path = require('path');
var express = require("express");
var fs = require("fs");
require("./libs/mongoose-init");


serverRoot = path.resolve(process.cwd(), "src");
console.log("server root path is : "+serverRoot);
console.log('server is starting...');
var app = express();




var port = 3000;
app.listen(port, listening);
function listening(){
	console.log('listening in port '+port);
}

//include all the services
fs.readdirSync(serverRoot+'/services').forEach(function(fileName){
	if(fileName.indexOf('.js')>0)
	app.use('/services',require('./services/'+fileName));
})



//include all the routes
// fs.readdirSync(serverRoot+'/routes').forEach(function(fileName){
// 	if(fileName.indexOf('.js')>0)
// 	app.use(require('./routes/'+fileName));
// })


//set fullback url to public/index.html
var dirname = path.resolve(); // for fixing empty path problem when using gulp
app.use(express.static(path.join(__dirname, '../public')));
app.use(fallback('/public/index.html', { root: dirname }))
app.get('*', function (req, res) {
	console.log("in....:"+ dirname );
	res.sendFile(route+"/public/index.html", {"root": dirname});
})



