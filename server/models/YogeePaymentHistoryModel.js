var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var YogeePaymentHistorySchema = new Schema({
	'YogeeId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'YogeeProfileUser'
	},
	'month' : Number,
	'year' : Number,
	'paystatus' : String,
	'monthlyfee' : Number
});

module.exports = mongoose.model('YogeePaymentHistory', YogeePaymentHistorySchema);
