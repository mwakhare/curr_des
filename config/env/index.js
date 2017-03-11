"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var env = process.env.NODE_ENV || 'development';
var config = require('./' + env);
var defaults = {
    root: path.join(__dirname, '/..')
};
exports.default = Object.assign(config, defaults);
//# sourceMappingURL=index.js.map