
var express = require('express');
var bcrypt = require('bcrypt');
import {sendChangePasswordEmail} from '../libs/nodemailer'
var changePasswordService = express.Router();
var crypto = require('crypto');
import Account from '../models/account'

changePasswordService.post('/changepassword',function(req,res){

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

						res.json({"message":"succssfully new temp password generated","newpassword":randomPassword});
					}

				})
			}
		});


});



module.exports = changePasswordService