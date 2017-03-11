"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Designer_1 = require("../models/User/Designer");
var DesignerController = (function () {
    function DesignerController() {
    }
    DesignerController.prototype.load = function (req, res, next, id) {
        Designer_1.Designer.getOne(id, function (err, designer) {
            if (err) {
                res.json({
                    success: false,
                    error_code: 91911,
                    general_message: 'Designer record is not found.',
                    errors: {
                        User: "Designer doesn't exist or is already deleted.",
                        Method: "Designer.getOne",
                        Class: "DesignerController"
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
    DesignerController.prototype.getDesigner = function (req, res) {
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
    DesignerController.prototype.update = function (req, res) {
        var designer = req.loadedDesigner;
        if (typeof (req.body.Brand_Name) != "undefined" || req.body.Brand_Name != null) {
            designer.Details.Brand_Name = req.body.Brand_Name;
        }
        if (typeof (req.body.Logo) != "undefined" || req.body.Logo != null) {
            designer.Details.Logo = req.body.Logo;
        }
        if (typeof (req.body.Story) != "undefined" || req.body.Story != null) {
            designer.Details.Story = req.body.Story;
        }
        if (typeof (req.body.Banner_Photo) != "undefined" || req.body.Banner_Photo != null) {
            designer.Details.Banner_Photo = req.body.Banner_Photo;
        }
        if (typeof (req.body.language) != "undefined" || req.body.language != null) {
            designer.Pref.language = req.body.language;
        }
        if (typeof (req.body.country) != "undefined" || req.body.country != null) {
            designer.Pref.country = req.body.country;
        }
        if (typeof (req.body.currency) != "undefined" || req.body.currency != null) {
            designer.Pref.currency = req.body.currency;
        }
        designer.update(function (err, result) {
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
    DesignerController.prototype.updateDesignerPref = function (req, res) {
        var designer = req.loadedDesigner;
        if (typeof (req.body.language) != "undefined" || req.body.language != null) {
            designer.Pref.language = req.body.language;
        }
        if (typeof (req.body.country) != "undefined" || req.body.country != null) {
            designer.Pref.country = req.body.country;
        }
        if (typeof (req.body.currency) != "undefined" || req.body.currency != null) {
            designer.Pref.currency = req.body.currency;
        }
        designer.updatePreference(function (err, result) {
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
    DesignerController.prototype.list = function (req, res) {
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
    DesignerController.prototype.remove = function (req, res) {
    };
    return DesignerController;
}());
exports.DesignerController = DesignerController;
//# sourceMappingURL=designer.controller.js.map