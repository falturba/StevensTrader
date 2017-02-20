var fallback = require('express-history-api-fallback');
var path = require('path');
var express = require("express");
var stormpath = require('express-stormpath');
var fs = require("fs");
require("./libs/mongoose-init");


serverRoot = path.resolve(process.cwd(), "src");
console.log("server root path is : "+serverRoot);
console.log('server is starting...');
var app = express();
app.use(stormpath.init(app, {
  apiKey: {
    id: '65MMGRAAKMW0WUHI69C60YDLX',
    secret: 'rcwRK4+rJFWWe/b5/VpAJE+2hUtJFkq0yEtv9J+XBQI'
  },
  application: {
    href: `https://api.stormpath.com/v1/applications/7VNFXM5t4213RvLurtTVdO`
  },web: {
    login: {
      enabled: false,
    }
}}));



app.on('stormpath.ready', function () {
  console.log('Stormpath Ready!');
});
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




fs.readdirSync(serverRoot+'/routes').forEach(function(fileName){
	if(fileName.indexOf('.js')>0)
	app.use(require('./routes/'+fileName));
})


//set fullback url to public/index.html
var dirname = path.resolve(); // for fixing empty path problem when using gulp
app.use(express.static(path.join(__dirname, '../public')));
app.use(fallback('/public/index.html', { root: dirname }))
app.get('*', function (req, res) {
	console.log("in....:"+ dirname );
	res.sendFile(route+"/public/index.html", {"root": dirname});
})



