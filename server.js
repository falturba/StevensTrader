var express = require("express");
var fs = require("fs");
require("./libs/mongoose-init");


console.log('server is starting');
var app = express();
var port = 3000;
app.listen(port, listening);
function listening(){
	console.log(`listening in port ${port}`);
}

//include all the services
fs.readdirSync('./services').forEach(function(fileName){
	if(fileName.indexOf('.js')>0)
	app.use('/services',require('./services/'+fileName));
})

//include all the routes
fs.readdirSync('./routes').forEach(function(fileName){
	if(fileName.indexOf('.js')>0)
	app.use(require('./routes/'+fileName));
})