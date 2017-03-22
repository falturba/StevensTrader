import fallback from 'express-history-api-fallback'
import path from 'path'
import express from "express"
import fs from "fs"
import bodyParser from 'body-parser'
import mongooseInit from './libs/mongoose-init'


const serverRoot = path.resolve(process.cwd(), "src")
console.log("server root path is : "+serverRoot)
console.log('server is starting...')
const app = express()


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}))

const port = 3000
app.listen(port, listening)
function listening(){
	console.log('listening in port '+port)
}

//include all the services
fs.readdirSync(serverRoot+'/services').forEach(function(fileName){
	if(fileName.indexOf('.js')>0)
		app.use('/services',require('./services/'+fileName))
})






fs.readdirSync(serverRoot+'/routes').forEach(function(fileName){
	if(fileName.indexOf('.js')>0)
	app.use(require('./routes/'+fileName))
})


//set fallback url to public/index.html
const dirname = path.resolve(); // for fixing empty path problem when using gulp
app.use(express.static(path.join(__dirname, '../public')))
app.use(fallback('/public/index.html', { root: dirname }))
app.get('*', function (req, res) {
	console.log("in....:"+ dirname )
	res.sendFile(route+"../public/index.html", {"root": dirname})
})

app.use(express.static(path.join(__dirname, 'public')))

export default app