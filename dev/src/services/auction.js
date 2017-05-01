import express from 'express'
import Item from '../models/item'
import Mongoose from 'mongoose'
import authenticate from '../middlewares/authenticate'
const auction = express.Router();



auction.post('/placebid/:email/:bid/:prodid',authenticate,function(req,res){
	console.log("placing a bid");
		if(req.params.prodid && req.params.bid && req.params.email)
		{
			let email = req.params.email
			let bid = 	req.params.bid
			let prodid = req.params.prodid 
			let bidObj = {
				email:req.params.email,
				bid:req.params.bid,
			}
			Item.update({_id:prodid},{$set:{price:bid},$push:{bidders:bidObj}},function(err,info){


				if(err)
				{
					console.log("ERROR:");
					res.status(500).json({status:"Error while connecting to the database"});
				}
				res.status(200).json({status:"bid placed successfully"});
			});
		}
		else
		{
			res.status(400).json({status:"bad request"});
		}
		res.status(400).json({status:"bad request"});

});

module.exports = auction