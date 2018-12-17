var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AdminUserSchema = new Schema({
	'userName' : String,
	'password' : String,
	'status' : String,
	'isAdmin' : Boolean
});

module.exports = mongoose.model('AdminUser', AdminUserSchema);
