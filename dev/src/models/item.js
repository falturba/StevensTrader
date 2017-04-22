import mongoose from 'mongoose'
import {condintionEnum, priceMin, priceMax} from './enum'
var Schema = mongoose.Schema;


var itemMediaSchema = new Schema({
  type:{type:String, required:true},
  imageName:{type:String, required:true},
  thumbnailName:{type:String}
})
var itemSchema = new Schema({
  title: {type:String,required:true},
  createdAt: {type: Date, default: Date.now, required: true},
  updatedAt: {type: Date, default: Date.now, required: true},
  description: {type: String},
  condition: {type: String, required: true, enum:condintionEnum},
  price:{type: Number, required: true,min:priceMin,max:priceMax},
  medias:[
    {
      id:mongoose.Schema.Types.ObjectId,
      img:{ data: Buffer, contentType: String },
      thumbnail: {data: Buffer, contentType: String }
    }
  ],
  userId: {type:Schema.Types.ObjectId}
})

var Items = mongoose.model('Item', itemSchema)

export default Items