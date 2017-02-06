var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var accountSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true }
});

// the schema is useless so far
// we need to create a model using it
var Account = mongoose.model('Account', accountSchema);

// make this available to our users in our Node applications
module.exports = Account;