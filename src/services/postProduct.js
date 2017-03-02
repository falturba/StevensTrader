import express from 'express'
import authenticate from '../middlewares/authenticate'
import formidable from 'formidable'
import crypto from 'crypto'
import sharp from 'sharp'
import Item from '../models/item'
import {imageDir} from '../config/pathConfig'
import fs from 'fs'

/************************************
 ************* IMPROVE ME ************
 *************************************/
// 1. Check file type
//  1.1 if video create thumbnail
//  1.2 if not image or video throw error
// 2. Check all image resize completed before save to DB.
//  2.1 Because it doesn't check for save resize image, so cannot delete image_small(thumbnail) when insert DB fail
/*************************************/

let router = express.Router()
router.post('/postproduct', /*authenticate,*/ (req, res) => {
  /**************************
  *** Raw function
  ****************************/
  // var data = ''

  // req.on('data', function (chunk) {
  //   console.log("chunk:",chunk)
  //   data += chunk
  // });

  // req.on('end', function () {
  //   console.log('File uploaded')
  //   res.status(201).json({ success: true })
  // })
  
    const data = {medias:[]};

    var form = new formidable.IncomingForm()

    form.parse(req, function(err, fields, files) {
        // console.dir(fields)
        // console.dir(files)
    })
    .on('fileBegin', function (name, file){
        // before start buffer
        
    //   file.path =  imagePath+ file.name
        const id = crypto.randomBytes(16).toString("hex")
        file.path =  imageDir+id //tell Formidable the path and name for saving image
        file.thumbnailSaveName = id+"_small" //inject value attach to 'file' envent
        file.saveName = id // inject value attach to 'file' envent
    })
    .on('file', function (name, file){
        //receive file argument
        sharp(file.path).resize(320, 240).toFile(imageDir+file.thumbnailSaveName, (err, info) => console.log(err,info) )
        data.medias.push({
            type:file.type,
            imageName:file.saveName,
            thumbnailName:file.thumbnailSaveName
        })
    })
    .on('field', function(field, value) {
        //receive field argument
        data[field] = value;
    })
    .on('end', function() {
        var item = new Item(data)
        item.save(function(err,result){
            if(err){
                data.medias.forEach(media=>{
                    fs.unlink(imageDir+media.imageName, ()=>{})
                    fs.unlink(imageDir+media.thumbnailName, ()=>{})
                })
                res.status(412).json(err)//db value is not valid
            }else{
                console.log("Complete save item.")
                res.status(200).json({status:"post complete."})
            }
        });
    });
});

//export default router;
module.exports = router