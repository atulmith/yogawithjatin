var moment = require('moment');
var YogeeProfileUserModel = require('../models/YogeeProfileUserModel.js');
var YogeePaymentTermsModel =require('../models/YogeePaymentTermsModel');

/**
 * YogeeProfileUserController.js
 *
 * @description :: Server-side logic for managing YogeeProfileUsers.
 */
module.exports = {

    /**
     * YogeeProfileUserController.list()
     */
    list: function (req, res) {
        YogeeProfileUserModel.find(function (err, YogeeProfileUsers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeProfileUser.',
                    error: err
                });
            }
            return res.json(YogeeProfileUsers);
        });
    },

    /**
     * YogeeProfileUserController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        YogeeProfileUserModel.findOne({_id: id}, function (err, YogeeProfileUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeProfileUser.',
                    error: err
                });
            }
            if (!YogeeProfileUser) {
                return res.status(404).json({
                    message: 'No such YogeeProfileUser'
                });
            }
            return res.json(YogeeProfileUser);
        });
    },

    /**
     * YogeeProfileUserController.create()
     */
    create: function (req, res) {
        var YogeeProfileUser = new YogeeProfileUserModel({
			name : req.body.name,
			age : req.body.age,
			dob : moment(req.body.dob,'DD/MM/YYYY').toDate(),
			address : req.body.address,
			pincode : req.body.pincode,
			mobile : req.body.mobile,
			gender : req.body.gender,
			maritalStatus : req.body.maritalStatus,
			resolution : req.body.resolution,
			userName : req.body.userName,
			password : req.body.password,
			status : req.body.status,
			batchId : req.body.batchId

        });

        YogeeProfileUser.save(async function (err, YogeeProfileUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating YogeeProfileUser',
                    error: err
                });
            }
            const yogeeid=YogeeProfileUser._id;
            var todaysdate=moment('DD/MM/YYYY').toDate();
            var YogeePaymentTerms=new YogeePaymentTermsModel({
                YogeeId:yogeeid,
                paymentType:6,
                fromdate:todaysdate,
                todate:todaysdate,
                monthlyfee:3500,
            });
            var yogeepaytermssaved=await YogeePaymentTerms.save();

            return res.status(201).json(YogeeProfileUser);
        });
    },

    /**
     * YogeeProfileUserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        console.log('updateuserprofile:',req.body);
        var dobstr=req.body.dob;
        // dobstr=moment(dobstr).toDate();

        YogeeProfileUserModel.findOne({_id: id}, function (err, YogeeProfileUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeProfileUser',
                    error: err
                });
            }
            if (!YogeeProfileUser) {
                return res.status(404).json({
                    message: 'No such YogeeProfileUser'
                });
            }

            YogeeProfileUser.name = req.body.name ? req.body.name : YogeeProfileUser.name;
			YogeeProfileUser.age = req.body.age ? req.body.age : YogeeProfileUser.age;
			YogeeProfileUser.dob = dobstr ? dobstr :YogeeProfileUser.dob ;
			YogeeProfileUser.address = req.body.address ? req.body.address : YogeeProfileUser.address;
			YogeeProfileUser.pincode = req.body.pincode ? req.body.pincode : YogeeProfileUser.pincode;
			YogeeProfileUser.mobile = req.body.mobile ? req.body.mobile : YogeeProfileUser.mobile;
			YogeeProfileUser.gender = req.body.gender ? req.body.gender : YogeeProfileUser.gender;
			YogeeProfileUser.maritalStatus = req.body.maritalStatus ? req.body.maritalStatus : YogeeProfileUser.maritalStatus;
			YogeeProfileUser.resolution = req.body.resolution ? req.body.resolution : YogeeProfileUser.resolution;
			YogeeProfileUser.userName = req.body.userName ? req.body.userName : YogeeProfileUser.userName;
			YogeeProfileUser.password = req.body.password ? req.body.password : YogeeProfileUser.password;
			YogeeProfileUser.status = req.body.status ? req.body.status : YogeeProfileUser.status;
			YogeeProfileUser.batchId = req.body.batchId ? req.body.batchId : YogeeProfileUser.batchId;
			
            YogeeProfileUser.save(function (err, YogeeProfileUser) {
                if (err) {
                    console.error('yogeeprofileuser update',err);
                    return res.status(500).json({
                        message: 'Error when updating YogeeProfileUser.',
                        error: err
                    });
                }
                console.error('yogeeprofileuser update success',YogeeProfileUser);
                
                return res.json(YogeeProfileUser);
            });
        });
    },

    /**
     * YogeeProfileUserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        YogeeProfileUserModel.findByIdAndRemove(id, function (err, YogeeProfileUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the YogeeProfileUser.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    /**
     * YogeeProfileUserController.yogeelogin()
     */
    yogeelogin: function (req, res) {
        var userName=req.body.userName;
        var password=req.body.password;
        console.log('yogeelogin',req.body,userName,password);    
        YogeeProfileUserModel.findOne({userName: userName,password:password}, function (err, YogeeProfileUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting YogeeProfileUser.',
                    error: err
                });
            }
            if (!YogeeProfileUser) {
                return res.status(404).json({
                    message: 'No such YogeeProfileUser'
                });
            }
            return res.json(YogeeProfileUser);
        });
 
 
    },
};
