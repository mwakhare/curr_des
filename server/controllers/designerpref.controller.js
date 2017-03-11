"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Designer_1 = require("../models/User/Designer");
var util = require("util");
var DesignerPrefController = (function () {
    function DesignerPrefController() {
    }
    DesignerPrefController.prototype.load = function (req, res, next, id) {
        Designer_1.Designer.getOne(id, function (err, designer) {
            if (err) {
                res.json({
                    success: false,
                    error_code: 91911,
                    general_message: 'Designer record is not found.',
                    errors: {
                        User: "Designer doesn't exist or is already deleted.",
                        Method: "Designer.getOne",
                        Class: "DesignerPrefController"
                    }
                });
                return next(err);
            }
            else {
                req.loadedDesigner = designer;
                return next();
            }
        });
    };
    DesignerPrefController.prototype.getDesigner = function (req, res) {
        var designer = req.loadedDesigner;
        if ((designer !== undefined) || (designer != null)) {
            return res.json({ "success": true, "getDesigner_result": designer });
        }
        return res.status(400).json({
            success: false,
            error_code: 91911,
            general_message: 'The Designer record is not found.',
            errors: {
                User: "The designer doesn't exist or may already be deleted.",
                Method: "getDesigner",
                Class: "DesignerController"
            }
        });
    };
    DesignerPrefController.prototype.updateDesignerPref = function (req, res) {
        var objDesigner = req.loadedDesigner;
        console.log("before updateDesignerPref- designer = " + util.inspect(objDesigner));
        console.log("before updateDesignerPref- req.body.language = " + req.body.language);
        var tempPref = {
            language: '',
            country: '',
            currency: ''
        };
        console.log("before updateDesignerPref- tempPref = " + util.inspect(tempPref));
        if (typeof (req.body.language) != "undefined" || req.body.language != null) {
            tempPref.language = req.body.language;
        }
        if (typeof (req.body.country) != "undefined" || req.body.country != null) {
            tempPref.country = req.body.country;
        }
        if (typeof (req.body.currency) != "undefined" || req.body.currency != null) {
            tempPref.currency = req.body.currency;
        }
        objDesigner.Pref = tempPref;
        console.log("After updateDesignerPref- designer = " + util.inspect(objDesigner));
        objDesigner.updatePreference(function (err, result) {
            if (err)
                return res.status(400).json({
                    success: false,
                    error_code: 91912,
                    general_message: 'Error has occured.',
                    errors: {
                        User: "Designer doesn't exist or is already deleted.",
                    }
                });
            else
                return res.json({ "success": true, "update_result": result });
        });
    };
    DesignerPrefController.prototype.list = function (req, res) {
        Designer_1.Designer.list(function (err, designers) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error_code: 91911,
                    general_message: 'List not found.',
                    errors: {
                        msg: "data base connection etc...",
                        method: "list",
                        class: "DesignerController"
                    }
                });
            }
            else {
                console.log(designers);
                return res.json({ "success": true, "list_result": designers });
            }
        });
    };
    DesignerPrefController.prototype.remove = function (req, res) {
    };
    return DesignerPrefController;
}());
exports.DesignerPrefController = DesignerPrefController;
//# sourceMappingURL=designerpref.controller.js.map