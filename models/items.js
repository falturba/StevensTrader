var mongoose = require('mongoose'); // node.js library for mongodb
var Schema = mongoose.Schema; // constructor

// create a schema for items being processed
var itemSchema = new Schema({
  name: {type:String,required:true},
  date: {type: Date, required: true},
  description: {type: String},
  condition: {type: String, required: true},
  setPrice:{type: Number, required: true}

// the schema is useless so far
// we need to create a model using it
var Items = mongoose.model('Items', itemSchema);

// make this available to our users in our Node applications
module.exports = Account;