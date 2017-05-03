import express from 'express'
import Item from '../models/item'
import Mongoose from 'mongoose'
const router = express.Router();


router.get('/getproductsforioswithcategory/:min/:max/:category',(req,res)=>{
  Item.aggregate(
  {
    $sort: {  updatedAt: -1 } 
  },
  
  {
    $match: 
    { $and:
     [ { 
      price: { $gte: parseInt(req.params.min), $lte: parseInt(req.params.max) },
      category:req.params.category 
    }  
    ] } 
  }
  ,
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
                  description:1,
                  auction:1,
                  category:1,
                  bidders:
                  {
                
                    bid:1,
                 
                  },
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
                res.status(200).json({products:data});
              })

});

router.get('/getproductsforios/:min/:max',(req,res)=>{

  Item.aggregate(
  {
    $sort: {  updatedAt: -1 } 
  },
  
  {
    $match: 
    { $and:
     [ { 
      price: { $gte: parseInt(req.params.min), $lte: parseInt(req.params.max) } 
    }  
    ] } 
  }
  ,
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
                  description:1,
                  auction:1,
                  category:1,
                  bidders:
                  {
          
                    bid:1,
     
                  },
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
                res.status(200).json({products:data});
              })

})

router.get('/getthumbnail/:id/',(req,res)=>{

  if(!Mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({status:"Wrong ID format"})
  }
  Item.aggregate([

    {$match:{
      _id :Mongoose.Types.ObjectId(req.params.id)
    }}
    ,{$project:{_id:1,"medias":{$arrayElemAt: [ "$medias", 0 ]}}} ]


    ,function (err, doc) {
      if (err)
      {
        console.log(err);
        res.status(500).json({status:"Error in the server while searching for the image"});
      }
      if(doc[0] == undefined || doc[0].medias == undefined ||  doc[0].medias.thumbnail == undefined)
      {
        res.status(204).json({status:"thumbnail does not exist"});

      }
      else
      {

        res.contentType(doc[0].medias.thumbnail.contentType);
        res.send(doc[0].medias.thumbnail.data.buffer);
      }

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
    else if(doc ==undefined || doc.medias == undefined || doc.medias[0].img == undefined)
    {
      res.status(204).json({status:"Image does not exist"});
      
    }
    else
    {
      res.contentType(doc.medias[0].img.contentType);
      res.send(doc.medias[0].img.data);
    }

    
  });//end of query
});

router.get('/getsmallimage/:id/',(req,res)=>{
  if(!Mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({status:"Wrong ID format"})
  }
  Item.findOne({'medias._id':req.params.id},{"medias.$.":1} ,function (err, doc) {
    if (err) 
    {
      console.log(err);
      res.status(500).json({status:"Error in the server while searching for the image"});
    }
    else if(doc ==undefined || doc.medias == undefined || doc.medias[0].img == undefined)
    {
      res.status(204).json({status:"Image does not exist"});
      
    }
    else
    {
      res.contentType(doc.medias[0].thumbnail.contentType);
      res.send(doc.medias[0].thumbnail.data);
    }

    
  });//end of query
});

module.exports = router