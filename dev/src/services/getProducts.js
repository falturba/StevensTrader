import express from 'express'
import Item from '../models/item'
const router = express.Router();
//testing
// 1. no product http://localhost:3000/services/getproduct/58e093d8423b3f2173adf9f8
// 2. status: "Wrong ID format" http://localhost:3000/services/getproduct/58e139846101f3001152b81d1
router.get('/getproducts',(req,res)=>{
    // console.dir(req)

    // Item.find({}, function(error, data){
    //     res.status(200).json({products:data});
    // })
    Item.aggregate([
        {
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
        },
        {
            $project:{
                _id:1,
                title:1,
                description:1,
                condition:1,
                price:1,
                medias:{
                	imageName:1,
                	thumbnailName:1
                },
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
        res.status(200).json({products:data});
    })

    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.json({status:'ok'})
})
module.exports = router