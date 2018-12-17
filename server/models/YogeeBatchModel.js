var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var YogeeBatchSchema = new Schema({
	'batchTiming' : String,
	'batchName' : String,
	'status' : String
});

module.exports = mongoose.model('YogeeBatch', YogeeBatchSchema);
