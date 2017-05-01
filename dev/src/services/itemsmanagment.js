var express = require('express');
import authenticate from '../middlewares/authenticate'
var itemsManagment = express.Router();
import Items from '../models/item'
itemsManagment.post('/deleteitem',authenticate,function(req,res){
	console.log("got delete item request");
	console.log(req.body.prodid);
	if(req.body.prodid)
	{
		Items.remove({_id:req.body.prodid},function(err,removed){

			if(err)
			{
				console.log(err);
				res.status(500).json({status:"something wen wrong in the database"});
			}
			else
			{
				res.status(200).json({status:"item deleted successfully"});
			}
	});
	}
	else
	{
		res.status(400).json({status:"bad request"});
	}
});




module.exports = itemsManagment