var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var YogeeMeasurementSchema = new Schema({
	'YogeeId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'YogeeProfileUser'
	},
	'measurementId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'MeasurementMaster'
	},
	'measureNumber' : Number,
	'measureYear'	: Number,
	'measureMonth'	: Number,
});

module.exports = mongoose.model('YogeeMeasurement', YogeeMeasurementSchema);
