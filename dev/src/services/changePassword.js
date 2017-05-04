
var express = require('express');
import authenticate from '../middlewares/authenticate'
var bcrypt = require('bcrypt');
import {sendChangePasswordEmail} from '../libs/nodemailer'
var changePasswordService = express.Router();
var crypto = require('crypto');
import Account from '../models/account'

changePasswordService.post('/forgotpassword',function(req,res){

	var url = crypto.randomBytes(20).toString('hex');
	Account.findOneAndUpdate({email:req.body.email},{$set:{chngpswdlnk:url}},function(err,info){

		if(err)
		{
			console.log(err);
			res.status(500).json({status:"Error while connecting to the database"});
			return;
		}
		else if(info)
		{
			sendChangePasswordEmail(req.body.email,url)
			res.json({"message":"Change password email sent succssfully"});
		}

	});
	

});
changePasswordService.get('/generatepassword/:url',function(req,res){
	

	Account.findOne({chngpswdlnk:req.params.url},function(err,account){
		if(err)
		{
			console.log(err);
			res.status(500).json({status:"error whole connecting to the database"});
		}
		if(!account)
		{
			res.json({msg:"url is not valid"})
		} else 
		{

			var randomPassword = Math.random().toString(36).slice(-8);
			var salt = bcrypt.genSaltSync(8);
			var hash = bcrypt.hashSync(randomPassword, salt);
			Account.update(account,{password:hash,chngpswdlnk:undefined},function(err,info){

				if(info)
				{

					//res.json({"message":"succssfully new temp password generated","newpassword":randomPassword});
					const HTML_STRING = "<html>"+
							"<body><h1>Your new password is </h1>'"+randomPassword+"'</body>"+
						+"</html>"
						return res.send(HTML_STRING)
				}else{
					res.status(403).json({status:"User not found."});
				}

			})
		}
	});


});

changePasswordService.post('/changepassword',authenticate,function(req,res){
	let currPass = req.body.currpass
	let newPass = req.body.newpass
	if(!currPass || !newPass)
	{
		res.status(400).send("Bad Request");
	}
	

	
	Account.findOne({token:req.token},function(err,account)
	{
		if(err)
			{
				console.log(err);
				res.status(500).json({status:"Couldn't connect to the databsae"});

			}
		if(bcrypt.compareSync(currPass,account.password))
		{
			var salt = bcrypt.genSaltSync(8);
			var hash = bcrypt.hashSync(newPass, salt);
			
			 if(account)

			{
				Account.update(account,{$set:{password:hash}},function(err,info){
				res.status(200).json({status:"password updated successfully"});
				});
				
			}
			else
			{
				res.status(401).json({status:"token is expired, please login again"});
			}

		}
		else
		{
				res.status(400).json({status:"Current Password is not correct"});
		}
		
		
			
		
	});
});


	module.exports = changePasswordService