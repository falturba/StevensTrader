import express from 'express'
import authenticate from '../middlewares/authenticate'
import postItemPolicy from '../middlewares/PostItemPolicy'
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
//  2.1 Because it doesn't check for saving resize image, so cannot delete image_small(thumbnail) when insert DB fail
/*************************************/

let router = express.Router()
router.post('/postproduct',authenticate,postItemPolicy, (req, res) => {
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
  // var totalCompleteNumber = 0;
  // var currentCompleteNumber = 0;
  // var alreadyEnd = false;
  // var waitingForImage = true;
  var promises = [];

  const data = {medias:[],userId:req.userId};



  var form = new formidable.IncomingForm()

  form.parse(req, function(err, fields, files) {
        // console.dir(fields)
        // console.dir(files)
        
      })
  .on('fileBegin', function (name, file){
        // before start buffer
        //filesCount++;
      //file.path =  imagePath+ file.name
      const id = crypto.randomBytes(16).toString("hex")
        file.path =  imageDir+id //tell Formidable the path and name for saving image
        file.thumbnailSaveName = id+"_small" //inject value attach to 'file' envent
        file.saveName = id // inject value attach to 'file' envent



      })
  .on('file', function (name, file){


        //receive file argument
        var imageInsertPromise = new Promise ((resolve,reject) => {



          sharp(file.path).resize(398, 398).toBuffer(function(err,img){



            if(err)
            {
              console.log(err);
              reject();

            } 
            else 
            {
             sharp(file.path).resize(200, 150).toBuffer(function(err,thmbnail){
              if(err)
              {
                console.log(err);
                reject();

              } 
              else
              {
                console.log("inside function to Buffer");
                data.medias.push({
                  type:file.type,
            img:{data: img,contentType :file.type}, //saving the image in the DB
            thumbnail:{data: thmbnail,contentType :file.type}
          });
                resolve();
              }


      });//second sharp


           }
    });//first sharp


        });


        promises.push(imageInsertPromise)
      })



      
      .on('field', function(field, value) {
        //receive field argument
        data[field] = value;

      })
      .on('end', function()
      {


        Promise.all(promises).then(()=>{
          console.log("started saving the item in the DB");
       var item = new Item(data);
       item.save(function(err,result){
        if(err){

          data.medias.forEach(media=>{
            fs.unlink(imageDir+media.imageName, ()=>{})
            fs.unlink(imageDir+media.thumbnailName, ()=>{})
          });
          console.log(err)
                res.status(412).json(err)//db value is not valid
              }else{

                console.log("Complete save item.")
                res.status(200).json({status:"post complete.",postId:result._doc._id.toString()})
              }
            });
       console.log("done trying to save the item");
     });

        })
       


});

    

//export default router;
module.exports = router