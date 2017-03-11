"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Designer_1 = require("../models/User/Designer");
var DesignerDetailController = (function () {
    function DesignerDetailController() {
    }
    DesignerDetailController.prototype.load = function (req, res, next, id) {
        Designer_1.Designer.getOne(id, function (err, designer) {
            if (err) {
                res.json({
                    success: false,
                    error_code: 91911,
                    general_message: 'Designer record is not found.',
                    errors: {
                        User: "Designer doesn't exist or is already deleted.",
                        Method: "Designer.getOne",
                        Class: "DesignerDetailController"
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
    DesignerDetailController.prototype.getDesigner = function (req, res) {
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
                Class: "DesignerDetailController"
            }
        });
    };
    DesignerDetailController.prototype.updateDesignerDetail = function (req, res) {
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
        designer.updateDetails(function (err, result) {
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
                return res.json({ "success": true, "updateDetails_result": result });
        });
    };
    DesignerDetailController.prototype.list = function (req, res) {
        Designer_1.Designer.list(function (err, designers) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error_code: 91911,
                    general_message: 'List not found.',
                    errors: {
                        msg: "data base connection etc...",
                        method: "list",
                        class: "DesignerDetailController"
                    }
                });
            }
            else {
                console.log(designers);
                return res.json({ "success": true, "list_result": designers });
            }
        });
    };
    DesignerDetailController.prototype.remove = function (req, res) {
    };
    return DesignerDetailController;
}());
exports.DesignerDetailController = DesignerDetailController;
//# sourceMappingURL=designerdetail.controller.js.map