import express from 'express'
import Item from '../models/item'
const router = express.Router();
router.get('/getproducts',(req,res)=>{
    // console.dir(req)

    Item.find({}, function(error, data){
        res.status(200).json({products:data});
    })
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.json({status:'ok'})
})
module.exports = router