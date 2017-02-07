var express = require('express')
var services = express.Router();
var bcrypt = require('bcrypt');
var Account = require('../models/account.js');
var bodyParser = require("body-parser");
services.use(bodyParser.json());

services.post('/signup',function(req,res){
	var hashedPassword = bcrypt.hashSync(req.body.password,10);
	var newAccount = new Account({
		name: req.body.name,
		email: req.body.email,
		hashedPassword: hashedPassword
	});
	newAccount.save(function(err){
		if(err){
			res.json({
				"status": "failed"
			})
		}else {
			res.json({
				"status": "success"
			})
		}
	});
});

services.get('/accounts',function(req,res){
	Account.find(function(err,acc){
		res.send(acc);
	})
});

module.exports = services

