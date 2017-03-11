"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductBase = (function () {
    function ProductBase(id, product_info) {
        this.save = function (callback) { };
        this.delete = function (callback) { };
        this._id = id;
        this._product_info = product_info;
    }
    Object.defineProperty(ProductBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductBase.prototype, "product_info", {
        get: function () {
            return this._product_info;
        },
        set: function (product_info) {
            this._product_info = product_info;
        },
        enumerable: true,
        configurable: true
    });
    return ProductBase;
}());
exports.ProductBase = ProductBase;
//# sourceMappingURL=ProductBase.js.map