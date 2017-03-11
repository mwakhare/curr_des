"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("../models/User/Customer");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var util = require("util");
var env_1 = require("../../config/env");
var AuthController = (function () {
    function AuthController() {
    }
    AuthController.prototype.login = function (req, res, next) {
        var reqUserEmail;
        if (req.body.email !== null || req.body.email !== "") {
            reqUserEmail = req.body.email;
        }
        else {
            return (res.json({ message: 'User name name is NUll or empty' }));
        }
        var reqPassword;
        if (req.body.password !== null || req.body.password !== "") {
            reqPassword = req.body.password;
        }
        else {
            return (res.json({ message: 'Password name is NUll or empty' }));
        }
        Customer_1.Customer.getOneByEmail(reqUserEmail, function (err, customer) {
            if (err) {
                console.log("Customer-static-getOne-getConnection has an error: " + err);
                return (res.json({ email: 'Customer.getOneByEmail NOT OK' }));
            }
            else {
                console.log("The output of Customer.getOneByEmail is Customer: " + util.inspect(customer));
                if (bcrypt.compareSync(reqPassword, customer.user_info.password)) {
                    var token = jwt.sign({
                        user: customer,
                    }, env_1.default.jwt_secret);
                    return res.json({
                        token: token,
                        user_id: customer.id
                    });
                }
                else {
                    res.statusCode = 400;
                    return res.json({
                        message: 'Password is incorrect',
                    });
                }
            }
        });
    };
    AuthController.prototype.register = function (req, res, next) {
        var reqName;
        if (req.body.name !== null || req.body.name !== "") {
            reqName = req.body.name;
        }
        var reqEmail;
        if (req.body.email !== null || req.body.email !== "") {
            reqEmail = req.body.email;
        }
        var reqPassword;
        if (req.body.password !== null || req.body.password !== "") {
            reqPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        }
        var reqDateOfBirth;
        if (req.body.date_of_birth !== null || req.body.date_of_birth !== "") {
            reqDateOfBirth = new Date(req.body.date_of_birth);
        }
        var reqDateOfAnniversary;
        if (req.body.date_of_anniversary !== null || req.body.date_of_anniversary !== "") {
            reqDateOfAnniversary = new Date(req.body.date_of_anniversary);
        }
        var reqGender;
        if (req.body.gender !== null || req.body.gender !== "") {
            reqGender = req.body.gender;
        }
        var reqSocial;
        if ((req.body.social !== null) || (req.body.social !== "")) {
            reqSocial = req.body.social;
        }
        var reqTc;
        if (req.body.tc !== null || req.body.tc !== "") {
            reqTc = req.body.tc;
        }
        var reqMobile;
        if (req.body.mobile_number !== null || req.body.mobile_number !== "") {
            reqMobile = req.body.mobile_number;
        }
        var reqVerified;
        if ((req.body.verified !== null) || (req.body.verified !== "")) {
            reqVerified = req.body.verified;
        }
        var reqActive;
        if (req.body.active !== null || req.body.active !== "") {
            reqActive = req.body.active;
        }
        var reqLastLogin;
        if (req.body.last_login !== null || req.body.last_login !== "") {
            reqLastLogin = new Date(req.body.last_login);
        }
        var reqIPAddress;
        if (req.body.ip_address !== null || req.body.ip_address !== "") {
            reqIPAddress = req.body.ip_address;
        }
        var reqMAC_Address;
        if (req.body.mac_address !== null || req.body.mac_address !== "") {
            reqMAC_Address = req.body.mac_address;
        }
        var reqBrowserString;
        if (req.body.browser_string !== null || req.body.browser_string !== "") {
            reqBrowserString = req.body.browser_string;
        }
        var user_info = {
            name: reqName,
            email: reqEmail,
            password: reqPassword,
            date_of_birth: reqDateOfBirth,
            date_of_anniversary: reqDateOfAnniversary,
            gender: reqGender,
            social: reqSocial,
            tc: reqTc,
            mobile_number: reqMobile,
            verified: reqVerified,
            active: reqActive,
            last_login: reqLastLogin,
            ip_address: reqIPAddress,
            mac_address: reqMAC_Address,
            browser_string: reqBrowserString,
        };
        var currentUser = new Customer_1.Customer(null, user_info);
        currentUser.save(function (err, val) {
            if (err) {
                return res.json({ message: "User is NOT registered." });
            }
            return res.json({ message: "User is registered." });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map