var AdminUserModel = require('../models/AdminUserModel.js');

/**
 * AdminUserController.js
 *
 * @description :: Server-side logic for managing AdminUsers.
 */
module.exports = {

    /**
     * AdminUserController.list()
     */
    list: function (req, res) {
        AdminUserModel.find(function (err, AdminUsers) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting AdminUser.',
                    error: err
                });
            }
            return res.json(AdminUsers);
        });
    },

    /**
     * AdminUserController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        AdminUserModel.findOne({_id: id}, function (err, AdminUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting AdminUser.',
                    error: err
                });
            }
            if (!AdminUser) {
                return res.status(404).json({
                    message: 'No such AdminUser'
                });
            }
            return res.json(AdminUser);
        });
    },

    /**
     * AdminUserController.create()
     */
    create: function (req, res) {
        console.log("AdminUserController create",req.body);
        var AdminUser = new AdminUserModel({
			userName : req.body.userName,
			password : req.body.password,
			status : req.body.status,
			isAdmin : req.body.isAdmin

        });
        console.log("AdminUser",AdminUser);

        AdminUser.save(function (err, AdminUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating AdminUser',
                    error: err
                });
            }
            return res.status(201).json(AdminUser);
        });
    },

    /**
     * AdminUserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        AdminUserModel.findOne({_id: id}, function (err, AdminUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting AdminUser',
                    error: err
                });
            }
            if (!AdminUser) {
                return res.status(404).json({
                    message: 'No such AdminUser'
                });
            }

            AdminUser.userName = req.body.userName ? req.body.userName : AdminUser.userName;
			AdminUser.password = req.body.password ? req.body.password : AdminUser.password;
			AdminUser.status = req.body.status ? req.body.status : AdminUser.status;
			AdminUser.isAdmin = req.body.isAdmin ? req.body.isAdmin : AdminUser.isAdmin;
			
            AdminUser.save(function (err, AdminUser) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating AdminUser.',
                        error: err
                    });
                }

                return res.json(AdminUser);
            });
        });
    },

    /**
     * AdminUserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        AdminUserModel.findByIdAndRemove(id, function (err, AdminUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the AdminUser.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
