var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//This model for unverfied users
var tempAccountSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true ,lowercase:true},
  pssword: { type: String, required: true },
  GENERATED_VERIFYING_URL: String
});


var Temp_Account = mongoose.model('Temp_Account', tempAccountSchema);


module.exports = Temp_Account;