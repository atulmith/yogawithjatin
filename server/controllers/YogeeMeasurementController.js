var YogeeMeasurementModel = require('../models/YogeeMeasurementModel.js');

/**
 * YogeeMeasurementController.js
 *
 * @description :: Server-side logic for managing YogeeMeasurements.
 */
module.exports = {

    /**
     * YogeeMeasurementController.list()
     */
    list: function (req, res) {
        YogeeMeasurementModel.find(function (err, YogeeMeasurements) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeMeasurement.',
                    error: err
                });
            }
            return res.json(YogeeMeasurements);
        });
    },

    /**
     * YogeeMeasurementController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        YogeeMeasurementModel.findOne({_id: id}, function (err, YogeeMeasurement) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeMeasurement.',
                    error: err
                });
            }
            if (!YogeeMeasurement) {
                return res.status(404).json({
                    message: 'No such YogeeMeasurement'
                });
            }
            return res.json(YogeeMeasurement);
        });
    },

    /**
     * YogeeMeasurementController.create()
     */
    create: function (req, res) {
        var YogeeMeasurement = new YogeeMeasurementModel({
			YogeeId : req.body.YogeeId,
			measurementId : req.body.measurementId,
			measureNumber : req.body.measureNumber,
            measureYear : req.body.measureYear,
            measureMonth : req.body.measureMonth,
            
        });

        YogeeMeasurement.save(function (err, YogeeMeasurement) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating YogeeMeasurement',
                    error: err
                });
            }
            return res.status(201).json(YogeeMeasurement);
        });
    },

    /**
     * YogeeMeasurementController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        YogeeMeasurementModel.findOne({_id: id}, function (err, YogeeMeasurement) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeMeasurement',
                    error: err
                });
            }
            if (!YogeeMeasurement) {
                return res.status(404).json({
                    message: 'No such YogeeMeasurement'
                });
            }

            YogeeMeasurement.YogeeId = req.body.YogeeId ? req.body.YogeeId : YogeeMeasurement.YogeeId;
			YogeeMeasurement.measurementId = req.body.measurementId ? req.body.measurementId : YogeeMeasurement.measurementId;
			YogeeMeasurement.measureNumber = req.body.measureNumber ? req.body.measureNumber : YogeeMeasurement.measureNumber;
			YogeeMeasurement.measureYear = req.body.measureYear ? req.body.measureYear : YogeeMeasurement.measureYear;
			YogeeMeasurement.measureMonth = req.body.measureMonth ? req.body.measureMonth : YogeeMeasurement.measureMonth;
			
            YogeeMeasurement.save(function (err, YogeeMeasurement) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating YogeeMeasurement.',
                        error: err
                    });
                }

                return res.json(YogeeMeasurement);
            });
        });
    },

    /**
     * YogeeMeasurementController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        YogeeMeasurementModel.findByIdAndRemove(id, function (err, YogeeMeasurement) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the YogeeMeasurement.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    /**
     * YogeeMeasurementController.saveandupdatemeasurement()
     *  Save or update the measurements for that user,measurementId,month and year
     */
    saveandupdatemeasurement: function (req, res) {
        // var id = req.params.id;
        var query={'YogeeId':req.body.YogeeId,'measurementId':req.body.measurementId,'measureYear':req.body.measureYear,'measureMonth':req.body.measureMonth}
        
        var YogeeMeasurement={}
        YogeeMeasurement.YogeeId = req.body.YogeeId ;
        YogeeMeasurement.measurementId = req.body.measurementId ;
        YogeeMeasurement.measureNumber = req.body.measureNumber ;
        YogeeMeasurement.measureYear = req.body.measureYear ;
        YogeeMeasurement.measureMonth = req.body.measureMonth ;

        YogeeMeasurementModel.findOneAndUpdate(query,YogeeMeasurement,{upsert:true},function (err, retYogeeMeasurement) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when saving YogeeMeasurement',
                    error: err
                });
            }
            if (!retYogeeMeasurement) {
                return res.status(404).json({
                    message: 'No such YogeeMeasurement'
                });
            }
            return res.json(retYogeeMeasurement);

        });
        
    },

    /**
    * get the measurements for the user, month and year passed as parameters

    */
    getUsersMeasurement: function (req, res) {
        var query={'YogeeId':req.body.YogeeId,'measureYear':req.body.measureYear,'measureMonth':req.body.measureMonth}
        
        YogeeMeasurementModel.find(query, function (err, YogeeMeasurements) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting list of YogeeMeasurements.',
                    error: err
                });
            }
            if (!YogeeMeasurements) {
                return res.status(404).json({
                    message: 'No such YogeeMeasurements'
                });
            }
            return res.json(YogeeMeasurements);
        });
    },

};
