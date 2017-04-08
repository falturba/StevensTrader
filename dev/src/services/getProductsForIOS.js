import express from 'express'
import Item from '../models/item'
import Mongoose from 'mongoose'
const router = express.Router();

router.get('/getproductsforios',(req,res)=>{

    Item.find({},{_id:1,title:1,price:1,condition:1}, function(error, data){
        console.log(data);
        res.status(200).json({products:data});
    })

})

router.get('/getthumbnail/:id/',(req,res)=>{
    console.log("got thumbnail request")
    if(!Mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({status:"Wrong ID format"})
    }

     Item.findById({_id:req.params.id},{_id:0,thumbnail:1} ,function (err, doc) {
          if (err) return next(err);
         res.contentType(doc.thumbnail.contentType);
          res.send(doc.thumbnail.data);
        });
    });

module.exports = router