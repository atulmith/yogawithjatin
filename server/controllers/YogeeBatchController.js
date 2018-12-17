var YogeeBatchModel = require('../models/YogeeBatchModel.js');

/**
 * YogeeBatchController.js
 *
 * @description :: Server-side logic for managing YogeeBatchs.
 */
module.exports = {

    /**
     * YogeeBatchController.list()
     */
    list: function (req, res) {
        YogeeBatchModel.find(function (err, YogeeBatchs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeBatch.',
                    error: err
                });
            }
            return res.json(YogeeBatchs);
        });
    },

    /**
     * YogeeBatchController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        YogeeBatchModel.findOne({_id: id}, function (err, YogeeBatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeBatch.',
                    error: err
                });
            }
            if (!YogeeBatch) {
                return res.status(404).json({
                    message: 'No such YogeeBatch'
                });
            }
            return res.json(YogeeBatch);
        });
    },

    /**
     * YogeeBatchController.create()
     */
    create: function (req, res) {
        var YogeeBatch = new YogeeBatchModel({
			batchTiming : req.body.batchTiming,
			batchName : req.body.batchName,
			status : req.body.status

        });

        YogeeBatch.save(function (err, YogeeBatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating YogeeBatch',
                    error: err
                });
            }
            return res.status(201).json(YogeeBatch);
        });
    },

    /**
     * YogeeBatchController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        YogeeBatchModel.findOne({_id: id}, function (err, YogeeBatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeBatch',
                    error: err
                });
            }
            if (!YogeeBatch) {
                return res.status(404).json({
                    message: 'No such YogeeBatch'
                });
            }

            YogeeBatch.batchTiming = req.body.batchTiming ? req.body.batchTiming : YogeeBatch.batchTiming;
			YogeeBatch.batchName = req.body.batchName ? req.body.batchName : YogeeBatch.batchName;
			YogeeBatch.status = req.body.status ? req.body.status : YogeeBatch.status;
			
            YogeeBatch.save(function (err, YogeeBatch) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating YogeeBatch.',
                        error: err
                    });
                }

                return res.json(YogeeBatch);
            });
        });
    },

    /**
     * YogeeBatchController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        YogeeBatchModel.findByIdAndRemove(id, function (err, YogeeBatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the YogeeBatch.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
