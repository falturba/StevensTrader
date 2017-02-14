var express = require('express')
var router = express.Router();


router.get('/',function(req,res){
	res.send("Welcome to Steven Trader System!");
});


module.exports = router