import express from 'express'
import Item from '../models/item'
import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';

const router = express.Router();
router.get('/getproducts',(req,res)=>{
    // console.dir(req)
    var token = req.headers["token"]
    if(token)
    {
    	jwt.verify(token, config.jwtSecret, function(err, decoded) {      
    		if (err) {
    			    res.json({ success: false, message: 'Failed to authenticate token.' });    
    		} else {
    			Item.find({}, function(error, data){
    				res.status(200).json({products:data});
    			});
    		}
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.json({status:'ok'})
			});
    }else {
    	return res.status(403).send({ 
        success: false, 
        message: 'No token provided.'
        });
    } 
    });
module.exports = router