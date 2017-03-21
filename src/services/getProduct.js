import express from 'express'
import Item from '../models/item'
const router = express.Router()
router.get('/getproduct/:id',(req,res)=>{
    // console.dir(req)
    Item.findOne({_id:req.params.id}, function(error, data){
        console.dir(data)
        res.status(200).json({product:data});
    })
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.json({status:'ok'})
})
module.exports = router