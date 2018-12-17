var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var YogeePaymentTermsSchema = new Schema({
	'YogeeId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'YogeeProfileUser'
	},
	'paymentType' : Number,
	'fromdate' : Date,
	'todate' : Date,
	'monthlyfee' : Number
});

module.exports = mongoose.model('YogeePaymentTerms', YogeePaymentTermsSchema);
