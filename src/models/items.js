var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  title: {type:String,required:true},
  date: {type: Date, required: true},
  description: {type: String},
  condition: {type: String, required: true,enum:['New','New with defects','Used','Very Good','Good','Acceptable']},
  price:{type: Number, required: true,min:5,max:5000},
  image:{data:Buffer,contentType:String}
});

var Items = mongoose.model('Items', itemSchema);

module.exports = Items;