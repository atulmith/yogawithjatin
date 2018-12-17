var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MeasurementMasterSchema = new Schema({
	'measureName' : String,
	'videoUrl' : String
});

module.exports = mongoose.model('MeasurementMaster', MeasurementMasterSchema);
