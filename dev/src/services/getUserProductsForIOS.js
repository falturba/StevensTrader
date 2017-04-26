import express from 'express'
import Item from '../models/item'
import Account from '../models/account';
import Mongoose from 'mongoose'
import authenticate from '../middlewares/authenticate'
const router = express.Router();
router.get('/getuserproductsforios',authenticate,(req,res)=>{

Account.aggregate(
{
  $sort: {  updatedAt: -1 } 
},


{ 
  $match:
  {
    token:req.token
  }
},
{ 
  $lookup:
  {
      from: "items",//join to what table
      foreignField: "userId",//join to what field
      localField: "_id",//current field
      as: "itemData"
  }
},
            {
              $unwind:
                { //destruture [] that wrap from joining table (lookup)
                  path: "$itemData",
                  preserveNullAndEmptyArrays: true
                }
              },
            
 { $project: 
  {
    _id:0,
    itemData:
    {
        _id:1,
       title:1,
       price:1,
       condition:1,
       createdAt:1,
       updatedAt:1,
       userId:1,
       medias:
       {
          _id:1
       }
    }
       
  }

}
, function(error, data)
  {
    if(error) console.log(error)
    console.log(data);
    res.status(200).json({products:data});
  });
});

module.exports = router