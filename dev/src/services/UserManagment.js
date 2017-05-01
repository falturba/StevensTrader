var express = require('express');
import authenticate from '../middlewares/authenticate'
var userManagmentService = express.Router();
import Account from '../models/account'
import Items from '../models/item'
userManagmentService.get('/useritemscount',authenticate,function(req,res){

	Account.findOne({token:req.token},{_id:1},function(err,account)
	{

		if(!account || err)
		{
			console.log(err);
			res.status(500).json({status:"Internal Error in the databse"});
		}

		Items.count({userId:account.id},function(err,c){
			if(err)
			{
				console.log(err);
				res.status(500).json({status:"internal error in the database"});
			}
			if(c)
				res.json({"count":c});
			else
				res.json({"count":0});

		})

	});

	

});

userManagmentService.post('/deleteuseraccount',authenticate,function(req,res){
	console.log("begun deleting the account");
	let userid = ""
	if(req.body.email)
	{
		Account.findOne({token:req.token,email:req.body.email},{_id:1},function(err,acc)
		{
			if(!acc || err)
			{
				console.log(err);
				res.status(500).json({status:"Internal Error in the databse"});
			}
			
			Items.remove({userId:acc.id},function(err,removed){
				if(err)
				{
					console.log(err);
					res.status(501).json({status:"Internal Error in the databse"});
				}
				Account.remove({_id:acc.id},function(err,removed){
					if(err)
					{
						console.log(err);
						res.status(502).json({status:"Internal Error in the databse"});
					}
					console.log("Account successfully deleted")
					res.status(200).json({status:"Account successfully deleted"});
				});

			});
			
			



		});
	}
	
	else
	{	console.log(req.body.email)
		res.status(400).json({status:"bad request, email is missing"});
	}
	

});


module.exports = userManagmentService