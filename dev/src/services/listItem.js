var express = require('express')
var listService = express.Router()
var Items = require("../models/item.js")
var bodyParser = require("body-parser");
listService.use(bodyParser.json({limit:'50mb'}));
listService.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
listService.post("/listitem",function(req,res){
	
	var item = new Items({
		title:req.body.title,
		date:new Date(),
		condition:req.body.condition,
		price:req.body.price,
	})
	item.save(function(err,result){
		if(err)
			res.json(err);
		else{
			res.json(result);
		}
	});

});

module.exports = listService