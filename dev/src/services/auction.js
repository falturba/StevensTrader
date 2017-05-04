import express from 'express'
import Item from '../models/item'
import Account from '../models/account'
import Mongoose from 'mongoose'
import authenticate from '../middlewares/authenticate'
import nodemailer from '../libs/nodemailer'

const auction = express.Router();



auction.post('/placebid',authenticate,function(req,res){

	if(req.body.prodid && req.body.bid && req.body.email)
	{
		let email = req.body.email;
		let bid = req.body.bid;
		let prodid = req.body.prodid; 
		let bidObj = {
			email:email,
			bid:bid,
		}
		Account.findOne({token:req.token,email:email},{_id:1},function(err,acc){

			if(err)
				{	console.log(err);
					res.status(500).json({status:"Error while connecting to the database"});
				}
				else
				{
					Item.findOne({_id:prodid},{userId:1},function(err,item){

						if(err)
						{

						}
						else
						{
							
							if(item.userId.equals(acc._id))
							{
								res.status(403).json({status:"you can not bid on your item"});
								return
							}
							else
							{
								Item.findOne({_id:prodid},{bidders:1,title:1,userId:1},function(err,data){
									if(data.bidders[0] != undefined)
									{
										if(data.bidders[data.bidders.length-1].email != email)
										{
											Item.update({_id:prodid},{$set:{price:bid},$push:{bidders:bidObj}},function(err,info){


												if(err)
												{
													console.log(err);
													res.status(500).json({status:"Error while connecting to the database"});
												}
												else
												{
													nodemailer.sendoutbidnotification(data.bidders[data.bidders.length-1],data.title,bid)
													Account.findOne({_id:data.userId},{email:1},function(err,info){
													nodemailer.sendbidnotification(info.email,data.title,bid);
													});
													res.status(200).json({status:"bid placed successfully"});
												}

											});
										}
										else
										{
											res.status(400).json({status:"you can not outbid yourself"});
										}
									}
									else
									{
										Item.update({_id:prodid},{$set:{price:bid},$push:{bidders:bidObj}},function(err,info){


											if(err)
											{
												console.log("ERROR:");
												res.status(500).json({status:"Error while connecting to the database"});
											}
											else
											{
												Account.findOne({_id:data.userId},{email:1},function(err,info){
													nodemailer.sendbidnotification(info.email,data.title,bid);
													});
												res.status(200).json({status:"bid placed successfully"});
											}

										});
									}

								});


							}
						}
					});
				}
			});
		




	}
	else
	{
		res.status(400).json({status:"bad request"});
	}


});

module.exports = auction