var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var YogeeProfileUserSchema = new Schema({
	'name' : String,
	'age' : Number,
	'dob' : Date,
	'address' : String,
	'pincode' : String,
	'mobile' : String,
	'gender' : String,
	'maritalStatus' : String,
	'resolution' : String,
	'userName' : String,
	'password' : String,
	'status' : String,
	'batchId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'YogeeBatch'
	}
});

module.exports = mongoose.model('YogeeProfileUser', YogeeProfileUserSchema);
