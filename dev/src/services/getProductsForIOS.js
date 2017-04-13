import express from 'express'
import Item from '../models/item'
import Mongoose from 'mongoose'
const router = express.Router();
router.get('/getproductsforios',(req,res)=>{

  Item.aggregate(
  {
    $sort: {  updatedAt: -1 } 
  },
  { $lookup:
    {
                from: "accounts",//join to what table
                foreignField: "_id",//join to what field
                localField: "userId",//current field
                as: "userData"
              }
            },
            {
              $unwind:
                { //destruture [] that wrap from joining table (lookup)
                  path: "$userData",
                  preserveNullAndEmptyArrays: true
                }
              },
              {
                $project:
                {
                  _id:1,
                  title:1,
                  price:1,
                  condition:1,
                  userData: {
                    name:1,
                    email:1
                  },
                  medias: {
                    _id:1
                  },
                  createdAt:1,
                  updatedAt:1
                }
              }


              , function(error, data){
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


router.get('/getimage/:id/',(req,res)=>{
  if(!Mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({status:"Wrong ID format"})
  }
  Item.findOne({'medias._id':req.params.id},{"medias.$.":1} ,function (err, doc) {
    if (err) 
    {
      console.log(err);
      res.status(500).json({status:"Error in the server while searching for the image"});
    }
    if(doc !=null)
    {
      res.contentType(doc.medias[0].img.contentType);
      res.send(doc.medias[0].img.data);
    }
    else
    {
      res.status(204).json({status:"Image does not exist"});
    }
  });
});

module.exports = router