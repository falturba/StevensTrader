import express from 'express'
const router = express.Router();
router.get('/getproducts',(req,res)=>{
    res.status(200).json({status:'ok'});
})
module.exports = router