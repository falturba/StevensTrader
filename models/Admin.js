var mongoose = require("mongoose"), // node.js library for mongodb
 Schema =  mongoose.Schema; // constructor

// constructing a schema for adminstration users
var AdminSchema = new Schema({
	admin_id : {type: Number, required: true, unique:true,},
	password : {type: String, required: true}

});
// created a function to the methods object that encrypts password
AdminSchema.methods.validPassword()= function(password){
	return bcrypt.compareSync(password, this.password);
}
// create a model/document from a model constructor using the AdminSchema
var Admin = mongoose.model('Admin', AdminSchema);

// make this available to our users in our Node applications
module.exports = Account;