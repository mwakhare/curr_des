"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("../models/User/Customer");
var bcrypt = require("bcryptjs");
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.load = function (req, res, next, id) {
        Customer_1.Customer.getOne(id, function (err, user) {
            if (err) {
                res.json({
                    success: false,
                    error_code: 91911,
                    general_message: 'User record is not found.',
                    errors: {
                        User: "User doesn't exist or is already deleted.",
                        Method: "Customer.getOne",
                        Class: "UserController"
                    }
                });
                return next(err);
            }
            else {
                req.loadedUser = user;
                return next();
            }
        });
    };
    UserController.prototype.getUser = function (req, res) {
        var user = req.loadedUser;
        if ((user !== undefined) || (user != null)) {
            return res.json({ "success": true, "getUser_result": user });
        }
        return res.status(400).json({
            success: false,
            error_code: 91911,
            general_message: 'The User record is not found.',
            errors: {
                User: "The User doesn't exist or may already be deleted.",
                Method: "getUser",
                Class: "UserController"
            }
        });
    };
    UserController.prototype.update = function (req, res) {
        var user = req.loadedUser;
        if (typeof (req.body.name) != "undefined" || req.body.name != null) {
            user.user_info.name = req.body.name;
        }
        if (typeof (req.body.email) != "undefined" || req.body.email != null) {
            user.user_info.email = req.body.email;
        }
        if (typeof (req.body.password) != "undefined" || req.body.password != null) {
            user.user_info.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        }
        if (typeof (req.body.date_of_birth) != "undefined" || req.body.date_of_birth != null) {
            user.user_info.date_of_birth = new Date(req.body.date_of_birth);
        }
        if (typeof (req.body.date_of_anniversary) != "undefined" || req.body.date_of_anniversary != null) {
            user.user_info.date_of_anniversary = new Date(req.body.date_of_anniversary);
        }
        if (typeof (req.body.gender) != "undefined" || req.body.gender != null) {
            user.user_info.gender = req.body.gender;
        }
        if (typeof (req.body.social) != "undefined" || req.body.social != null) {
            user.user_info.social = req.body.social;
        }
        if (typeof (req.body.tc) != "undefined" || req.body.tc != null) {
            user.user_info.tc = req.body.tc;
        }
        if (typeof (req.body.mobile_number) != "undefined" || req.body.mobile_number != null) {
            user.user_info.mobile_number = req.body.mobile_number;
        }
        if (typeof (req.body.verified) != "undefined" || req.body.verified != null) {
            user.user_info.verified = req.body.verified;
        }
        if (typeof (req.body.active) != "undefined" || req.body.active != null) {
            user.user_info.active = req.body.active;
        }
        if (typeof (req.body.last_login) != "undefined" || req.body.last_login != null) {
            user.user_info.last_login = new Date(req.body.last_login);
        }
        if (req.body.ip_address !== null || req.body.ip_address !== "") {
            user.user_info.ip_address = req.body.ip_address;
        }
        if (typeof (req.body.mac_address) != "undefined" || req.body.mac_address != null) {
            user.user_info.mac_address = req.body.mac_address;
        }
        if (typeof (req.body.browser_string) != "undefined" || req.body.browser_string != null) {
            user.user_info.browser_string = req.body.browser_string;
        }
        if (typeof (req.body.profile_pic) != "undefined" || req.body.profile_pic != null) {
            user.profile.profile_pic = req.body.profile_pic;
        }
        if (typeof (req.body.address) != "undefined" || req.body.address != null) {
            user.profile.address = req.body.address;
        }
        if (typeof (req.body.role) != "undefined" || req.body.role != null) {
            user.profile.role = req.body.role;
        }
        if (typeof (req.body.capabilities) != "undefined" || req.body.capabilities != null) {
            user.profile.capabilities = req.body.capabilities;
        }
        if (typeof (req.body.favourites) != "undefined" || req.body.favourites != null) {
            user.profile.favourites = req.body.favourites;
        }
        user.update(function (err, result) {
            if (err)
                return res.status(400).json({
                    success: false,
                    error_code: 91912,
                    general_message: 'Error has occured.',
                    errors: {
                        User: "User doesn't exist or is already deleted.",
                    }
                });
            else
                return res.json({ "success": true, "update_result": result });
        });
    };
    UserController.prototype.list = function (req, res) {
        Customer_1.Customer.list(function (err, customers) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error_code: 91911,
                    general_message: 'Lis not found.',
                    errors: {
                        msg: "data base connection etc...",
                        method: "list",
                        class: "UserController"
                    }
                });
            }
            else {
                console.log(customers);
                return res.json({ "success": true, "list_result": customers });
            }
        });
    };
    UserController.prototype.remove = function (req, res) {
        var user = req.loadedUser;
        console.log("user.controller - remove method- if condition (user is NOT undefined or null).  user: " + user);
        if (user !== undefined) {
            user.delete(function (err, result) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        error_code: 91911,
                        general_message: 'The User record is not found.',
                        errors: {
                            User: "The User doesn't exist or may already be deleted.",
                            Method: "user.delete",
                            Class: "UserController"
                        }
                    });
                }
                else {
                    return res.json({ "success": true, "message": "User is deleted.", "remove_result": result });
                }
            });
        }
        else {
            return res.status(400).json({
                success: false,
                error_code: 91915,
                general_message: 'The User record is not found.',
                errors: {
                    User: "The User doesn't exist or may already be deleted.",
                    condition: "The User is undefined.",
                    Method: "user.delete",
                    Class: "UserController"
                }
            });
        }
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map