var express = require('express')
var router = express.Router();


router.get('/admin',function(req,res){
	//res.send("Welcome");
	res.sendFile(__dirname+"/html/AdminLogin-Firebase.html");
});


module.exports = router