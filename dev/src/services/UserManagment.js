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

module.exports = userManagmentService