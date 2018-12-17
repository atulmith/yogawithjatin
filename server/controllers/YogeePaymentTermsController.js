var moment= require('moment');
var YogeePaymentTermsModel = require('../models/YogeePaymentTermsModel.js');
var YogeeProfileUserModel = require('../models/YogeeProfileUserModel');
var YogeePaymentHistoryModel =require('../models/YogeePaymentHistoryModel');
/**
 * YogeePaymentTermsController.js
 *
 * @description :: Server-side logic for managing YogeePaymentTermss.
 */
module.exports = {

    /**
     * YogeePaymentTermsController.list()
     */
    list: async function (req, res) {

        var todaysdate=moment().startOf('day');
        var fivedaysahead=todaysdate.add(5,'days');

        try {
            var YogeePaymentTermss=await YogeePaymentTermsModel.find({todate:{'$lte':fivedaysahead}})
            .populate(
                {
                    path:'YogeeId',
                    // select:'name',
                    populate:[
                        {
                            path:'batchId',
                            model:'YogeeBatch',
                            select: '_id batchTiming batchName'
                        }]
                }
            );
            if(YogeePaymentTermss){
                return res.json(YogeePaymentTermss);
            }
            else{
                throw 'is empty';
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Error when getting YogeePaymentTerms.',
                error: error
            });    
        }
        

        // YogeePaymentTermsModel.find({todate:{'$lte':fivedaysahead}},function (err, YogeePaymentTermss) {
        //     if (err) {
        //         return res.status(500).json({
        //             message: 'Error when getting YogeePaymentTerms.',
        //             error: err
        //         });
        //     }
        //     return res.json(YogeePaymentTermss);
        // });
    },

    /**
     * YogeePaymentTermsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        YogeePaymentTermsModel.findOne({_id: id}, function (err, YogeePaymentTerms) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeePaymentTerms.',
                    error: err
                });
            }
            if (!YogeePaymentTerms) {
                return res.status(404).json({
                    message: 'No such YogeePaymentTerms'
                });
            }
            return res.json(YogeePaymentTerms);
        });
    },

    /**
     * YogeePaymentTermsController.create()
     */
    create: function (req, res) {
        var YogeePaymentTerms = new YogeePaymentTermsModel({
			YogeeId : req.body.YogeeId,
			paymentType : req.body.paymentType,
			fromdate : req.body.fromdate,
			todate : req.body.todate,
			monthlyfee : req.body.monthlyfee

        });

        YogeePaymentTerms.save(function (err, YogeePaymentTerms) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating YogeePaymentTerms',
                    error: err
                });
            }
            return res.status(201).json(YogeePaymentTerms);
        });
    },

    /**
     * YogeePaymentTermsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        YogeePaymentTermsModel.findOne({_id: id}, function (err, YogeePaymentTerms) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeePaymentTerms',
                    error: err
                });
            }
            if (!YogeePaymentTerms) {
                return res.status(404).json({
                    message: 'No such YogeePaymentTerms'
                });
            }

            YogeePaymentTerms.YogeeId = req.body.YogeeId ? req.body.YogeeId : YogeePaymentTerms.YogeeId;
			YogeePaymentTerms.paymentType = req.body.paymentType ? req.body.paymentType : YogeePaymentTerms.paymentType;
			YogeePaymentTerms.fromdate = req.body.fromdate ? req.body.fromdate : YogeePaymentTerms.fromdate;
			YogeePaymentTerms.todate = req.body.todate ? req.body.todate : YogeePaymentTerms.todate;
			YogeePaymentTerms.monthlyfee = req.body.monthlyfee ? req.body.monthlyfee : YogeePaymentTerms.monthlyfee;
			
            YogeePaymentTerms.save(function (err, YogeePaymentTerms) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating YogeePaymentTerms.',
                        error: err
                    });
                }

                return res.json(YogeePaymentTerms);
            });
        });
    },

    /**
     * YogeePaymentTermsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        YogeePaymentTermsModel.findByIdAndRemove(id, function (err, YogeePaymentTerms) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the YogeePaymentTerms.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
    /**
     * YogeePaymentTermsController.createAndPaymenthistory()
     * Update yogee payment terms with any changes the user made 
     * Save in Yogee payment history the month ,year and monthly charge paid by the yogee.
     */
    createAndPaymenthistory: function (req, res) {
        var yogeeid=req.body.YogeeId;
        var paymenttype=req.body.paymentType;
        var fromdatestr=req.body.fromdate;
        var todatestr=req.body.todate;
        var monthlyfee=req.body.monthlyfee;

        var query={'YogeeId':yogeeid}

        try {
            var YogeePaymentTerms = {
                YogeeId : yogeeid,
                paymentType : paymenttype,
                fromdate : moment(fromdatestr,'DD/MM/YYYY').toDate(),
                todate : moment(todatestr,'DD/MM/YYYY').toDate(),
                monthlyfee : monthlyfee,

            };
            YogeePaymentTermsModel.findOneAndUpdate(query,YogeePaymentTerms,{upsert:true},async function (err, retYogeePaymentTerms) {
                
                var fromdateobj=moment(fromdatestr,'DD/MM/YYYY');
                var todateobj=moment(todatestr,'DD/MM/YYYY');
                

                for(var i=0;i<paymenttype;i++){
                    var addedmonth=fromdateobj.get('month');
                    var addedyear=fromdateobj.get('year');

                    var YogeePaymentHistory= new YogeePaymentHistoryModel({
                        YogeeId:yogeeid,
                        month:addedmonth,
                        year:addedyear,
                        paystatus:'P',
                        monthlyfee:monthlyfee,
                    });

                    var ret=await YogeePaymentHistory.save()

                    fromdateobj.add(1,'months');
                    
                }

                if(retYogeePaymentTerms){
                    return res.status(201).json(retYogeePaymentTerms);
                }else{
                    throw new Error('empty result');
                }

            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error when creating YogeePaymentTerms',
                error: error
            });   
        }
        // YogeePaymentTerms.crapsave(function (err, YogeePaymentTerms) {
        //     if (err) {
        //         return res.status(500).json({
        //             message: 'Error when creating YogeePaymentTerms',
        //             error: err
        //         });
        //     }
        //     return res.status(201).json(YogeePaymentTerms);
        // });
    },
};
