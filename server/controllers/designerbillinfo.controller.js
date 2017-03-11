"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Designer_1 = require("../models/User/Designer");
var DesignerBillInfoController = (function () {
    function DesignerBillInfoController() {
    }
    DesignerBillInfoController.prototype.load = function (req, res, next, id) {
        Designer_1.Designer.getOne(id, function (err, designer) {
            if (err) {
                res.json({
                    success: false,
                    error_code: 91911,
                    general_message: 'Designer record is not found.',
                    errors: {
                        User: "Designer doesn't exist or is already deleted.",
                        Method: "Designer.getOne",
                        Class: "DesignerBillInfoController"
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
    DesignerBillInfoController.prototype.getDesigner = function (req, res) {
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
                Class: "DesignerBillInfoController"
            }
        });
    };
    DesignerBillInfoController.prototype.updateDesignerBillingInfo = function (req, res) {
        var designer = req.loadedDesigner;
        if (typeof (req.body.paypal) != "undefined" || req.body.paypal != null) {
            designer.BillingInfo.paypal = req.body.paypal;
        }
        if (typeof (req.body.email) != "undefined" || req.body.email != null) {
            designer.BillingInfo.email = req.body.email;
        }
        designer.updateBillingInfo(function (err, result) {
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
                return res.json({ "success": true, "DesignerBillInfoController_result": result });
        });
    };
    DesignerBillInfoController.prototype.list = function (req, res) {
        Designer_1.Designer.list(function (err, designers) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error_code: 91911,
                    general_message: 'List not found.',
                    errors: {
                        msg: "data base connection etc...",
                        method: "list",
                        class: "DesignerBillInfoController"
                    }
                });
            }
            else {
                console.log(designers);
                return res.json({ "success": true, "list_result": designers });
            }
        });
    };
    DesignerBillInfoController.prototype.remove = function (req, res) {
    };
    return DesignerBillInfoController;
}());
exports.DesignerBillInfoController = DesignerBillInfoController;
//# sourceMappingURL=designerbillinfo.controller.js.map