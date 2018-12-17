var MeasurementMasterModel = require('../models/MeasurementMasterModel.js');

/**
 * MeasurementMasterController.js
 *
 * @description :: Server-side logic for managing MeasurementMasters.
 */
module.exports = {

    /**
     * MeasurementMasterController.list()
     */
    list: function (req, res) {
        MeasurementMasterModel.find(function (err, MeasurementMasters) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting MeasurementMaster.',
                    error: err
                });
            }
            return res.json(MeasurementMasters);
        });
    },

    /**
     * MeasurementMasterController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        MeasurementMasterModel.findOne({_id: id}, function (err, MeasurementMaster) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting MeasurementMaster.',
                    error: err
                });
            }
            if (!MeasurementMaster) {
                return res.status(404).json({
                    message: 'No such MeasurementMaster'
                });
            }
            return res.json(MeasurementMaster);
        });
    },

    /**
     * MeasurementMasterController.create()
     */
    create: function (req, res) {
        var MeasurementMaster = new MeasurementMasterModel({
			measureName : req.body.measureName,
			videoUrl : req.body.videoUrl

        });

        MeasurementMaster.save(function (err, MeasurementMaster) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating MeasurementMaster',
                    error: err
                });
            }
            return res.status(201).json(MeasurementMaster);
        });
    },

    /**
     * MeasurementMasterController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        MeasurementMasterModel.findOne({_id: id}, function (err, MeasurementMaster) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting MeasurementMaster',
                    error: err
                });
            }
            if (!MeasurementMaster) {
                return res.status(404).json({
                    message: 'No such MeasurementMaster'
                });
            }

            MeasurementMaster.measureName = req.body.measureName ? req.body.measureName : MeasurementMaster.measureName;
			MeasurementMaster.videoUrl = req.body.videoUrl ? req.body.videoUrl : MeasurementMaster.videoUrl;
			
            MeasurementMaster.save(function (err, MeasurementMaster) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating MeasurementMaster.',
                        error: err
                    });
                }

                return res.json(MeasurementMaster);
            });
        });
    },

    /**
     * MeasurementMasterController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        MeasurementMasterModel.findByIdAndRemove(id, function (err, MeasurementMaster) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the MeasurementMaster.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
