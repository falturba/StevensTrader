import express from 'express'
import Item from '../models/item'
import Mongoose from 'mongoose'
const router = express.Router()
router.get('/getproduct/:id',(req,res)=>{
    // console.dir(req)
    // Item.findOne({_id:req.params.id}, function(error, data){
    //     console.dir(data)
    //     res.status(200).json({product:data});
    // })
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.json({status:'ok'})
    if(!Mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({status:"Wrong ID format"})
    }

    Item.aggregate([
        {
            $match:{
                _id: new Mongoose.Types.ObjectId(req.params.id)
            }
        },{
            $sort: {  updatedAt: -1 } 
        },
        {
            $lookup:
            {
                from: "accounts",//join to what table
                foreignField: "_id",//join to what field
                localField: "userId",//current field
                as: "userData"
            }
        },{
            $unwind:"$userData" //destruture [] that wrap from joining table (lookup)
        },{
            $project:{
                _id:1,
                title:1,
                description:1,
                condition:1,
                price:1,
                medias:1,
                updatedAt:1,
                createdAt:1,
                userData:{
                    _id:1,
                    email:1,
                    name:1
                }
            }
        }


    ], function(error, data){
        console.dir(data)
        //get rid of [] that wrap by aggregate it's imposible to use aggregate query without array response even it is only one result.
        let returnData=""
        if(data[0]){
            returnData=data[0]
        }
        console.log("products:")
        console.dir(returnData)
        res.status(200).json({product:returnData})
    })
})
module.exports = router