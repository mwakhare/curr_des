"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi = require("joi");
exports.default = {
    createUser: {
        body: {
            username: joi.string().required(),
            mobileNumber: joi.string().regex(/^[1-9][0-9]{9}$/).required()
        }
    },
    updateUser: {
        body: {
            name: joi.string().required(),
        },
        params: {
            userId: joi.string().hex().required()
        }
    },
    login: {
        body: {
            email: joi.string().email().required(),
            password: joi.string().required()
        }
    },
    register: {
        body: {
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required()
        }
    }
};
//# sourceMappingURL=param-validation.js.map