"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var httpStatus = require("http-status");
var ExtendableError = (function (_super) {
    __extends(ExtendableError, _super);
    function ExtendableError(message, status, isPublic) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        _this.status = status;
        _this.isPublic = isPublic;
        _this.isOperational = true;
        Error.captureStackTrace(_this, _this.constructor.name);
        return _this;
    }
    return ExtendableError;
}(Error));
var APIError = (function (_super) {
    __extends(APIError, _super);
    function APIError(message, status, isPublic) {
        if (status === void 0) { status = httpStatus.INTERNAL_SERVER_ERROR; }
        if (isPublic === void 0) { isPublic = false; }
        return _super.call(this, message, status, isPublic) || this;
    }
    return APIError;
}(ExtendableError));
exports.APIError = APIError;
//# sourceMappingURL=APIError.js.map