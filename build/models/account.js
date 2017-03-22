'use strict';

var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var accountSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
});

accountSchema.methods.validPassword = function (password) {
  console.log(password, this.password);
  return bcrypt.compareSync(password, this.password);
};

// the schema is useless so far
// we need to create a model using it
var Account = mongoose.model('Account', accountSchema);

// make this available to our users in our Node applications
module.exports = Account;
//# sourceMappingURL=account.js.map