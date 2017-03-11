"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CategoryBase = (function () {
    function CategoryBase(id, category_info) {
        this.save = function () { };
        this.delete = function () { return false; };
        this._id = id;
        this._category_info = category_info;
    }
    Object.defineProperty(CategoryBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryBase.prototype, "category_info", {
        get: function () {
            return this._category_info;
        },
        set: function (category_info) {
            this._category_info = category_info;
        },
        enumerable: true,
        configurable: true
    });
    return CategoryBase;
}());
exports.CategoryBase = CategoryBase;
//# sourceMappingURL=CategoryBase.js.map