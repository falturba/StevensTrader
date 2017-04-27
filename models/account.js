var mongoose = require('mongoose'); // node.js library for mongodb
var Schema = mongoose.Schema; // constructor

// create a schema for users of the product
var accountSchema = new Schema({
  name: {type:String,required:true},
  email: { type: String, required: true, unique: true ,lowercase:true},
  password: { type: String, required: true }
});
// created a function to the methods object that encrypts password
accountSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// the schema is useless so far
// we need to create a model using it
var Account = mongoose.model('Account', accountSchema);



// make this available to our users in our Node applications
module.exports = Account;