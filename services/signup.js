var express = require('express')
var services = express.Router();
var Account = require('../models/account.js');
// middleware that is specific to this router


// define the home page route
services.get('/signup/',function(req,res){
	Account.find(function(err,acc){
		res.send(acc);
	});
});

module.exports = services

