var YogeePaymentHistoryModel = require('../models/YogeePaymentHistoryModel.js');

/**
 * YogeePaymentHistoryController.js
 *
 * @description :: Server-side logic for managing YogeePaymentHistorys.
 */
module.exports = {

    /**
     * YogeePaymentHistoryController.list()
     */
    list: function (req, res) {
        YogeePaymentHistoryModel.find(function (err, YogeePaymentHistorys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeePaymentHistory.',
                    error: err
                });
            }
            return res.json(YogeePaymentHistorys);
        });
    },

    /**
     * YogeePaymentHistoryController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        YogeePaymentHistoryModel.findOne({_id: id}, function (err, YogeePaymentHistory) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeePaymentHistory.',
                    error: err
                });
            }
            if (!YogeePaymentHistory) {
                return res.status(404).json({
                    message: 'No such YogeePaymentHistory'
                });
            }
            return res.json(YogeePaymentHistory);
        });
    },

    /**
     * YogeePaymentHistoryController.create()
     */
    create: function (req, res) {
        var YogeePaymentHistory = new YogeePaymentHistoryModel({
			YogeeId : req.body.YogeeId,
			month : req.body.month,
			year : req.body.year,
			paystatus : req.body.paystatus,
			monthlyfee : req.body.monthlyfee

        });

        YogeePaymentHistory.save(function (err, YogeePaymentHistory) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating YogeePaymentHistory',
                    error: err
                });
            }
            return res.status(201).json(YogeePaymentHistory);
        });
    },

    /**
     * YogeePaymentHistoryController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        YogeePaymentHistoryModel.findOne({_id: id}, function (err, YogeePaymentHistory) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeePaymentHistory',
                    error: err
                });
            }
            if (!YogeePaymentHistory) {
                return res.status(404).json({
                    message: 'No such YogeePaymentHistory'
                });
            }

            YogeePaymentHistory.YogeeId = req.body.YogeeId ? req.body.YogeeId : YogeePaymentHistory.YogeeId;
			YogeePaymentHistory.month = req.body.month ? req.body.month : YogeePaymentHistory.month;
			YogeePaymentHistory.year = req.body.year ? req.body.year : YogeePaymentHistory.year;
			YogeePaymentHistory.paystatus = req.body.paystatus ? req.body.paystatus : YogeePaymentHistory.paystatus;
			YogeePaymentHistory.monthlyfee = req.body.monthlyfee ? req.body.monthlyfee : YogeePaymentHistory.monthlyfee;
			
            YogeePaymentHistory.save(function (err, YogeePaymentHistory) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating YogeePaymentHistory.',
                        error: err
                    });
                }

                return res.json(YogeePaymentHistory);
            });
        });
    },

    /**
     * YogeePaymentHistoryController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        YogeePaymentHistoryModel.findByIdAndRemove(id, function (err, YogeePaymentHistory) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the YogeePaymentHistory.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
