"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Designer_1 = require("../models/User/Designer");
var DesignerAddInfoController = (function () {
    function DesignerAddInfoController() {
    }
    DesignerAddInfoController.prototype.load = function (req, res, next, id) {
        Designer_1.Designer.getOne(id, function (err, designer) {
            if (err) {
                res.json({
                    success: false,
                    error_code: 91911,
                    general_message: 'Designer record is not found.',
                    errors: {
                        User: "Designer doesn't exist or is already deleted.",
                        Method: "Designer.getOne",
                        Class: "DesignerAddInfoController"
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
    DesignerAddInfoController.prototype.getDesigner = function (req, res) {
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
                Class: "DesignerAddInfoController"
            }
        });
    };
    DesignerAddInfoController.prototype.updateDesignerAdditionalInfo = function (req, res) {
        var designer = req.loadedDesigner;
        if (typeof (req.body.Require_Warehouse) != "undefined" || req.body.Require_Warehouse != null) {
            designer.AdditionalInfo.Require_Warehouse = req.body.Require_Warehouse;
        }
        if (typeof (req.body.Require_Shipping_Service) != "undefined" || req.body.Require_Shipping_Service != null) {
            designer.AdditionalInfo.Require_Shipping_Service = req.body.Require_Shipping_Service;
        }
        if (typeof (req.body.Require_Manufacturer_Support) != "undefined" || req.body.Require_Manufacturer_Support != null) {
            designer.AdditionalInfo.Require_Manufacturer_Support = req.body.Require_Manufacturer_Support;
        }
        designer.updateAdditionalInfo(function (err, result) {
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
                return res.json({ "success": true, "DesignerAddInfoController_result": result });
        });
    };
    DesignerAddInfoController.prototype.list = function (req, res) {
        Designer_1.Designer.list(function (err, designers) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error_code: 91911,
                    general_message: 'List not found.',
                    errors: {
                        msg: "data base connection etc...",
                        method: "list",
                        class: "DesignerAddInfoController"
                    }
                });
            }
            else {
                console.log(designers);
                return res.json({ "success": true, "list_result": designers });
            }
        });
    };
    DesignerAddInfoController.prototype.remove = function (req, res) {
    };
    return DesignerAddInfoController;
}());
exports.DesignerAddInfoController = DesignerAddInfoController;
//# sourceMappingURL=designeraddinfo.controller.js.map