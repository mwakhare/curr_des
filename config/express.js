"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compression = require("compression");
var methodOverride = require("method-override");
var cors = require("cors");
var httpStatus = require("http-status");
var expressWinston = require("express-winston");
var helmet = require("helmet");
var winston = require("./winston");
var index = require("../server/routes/index.route");
var config = require("./env");
var APIError_1 = require("../server/helpers/APIError");
var Application = (function () {
    function Application() {
        this._app = express();
        this.middleware();
        this.routes();
        if (config.env === 'development') {
            this.applyDevEnv();
        }
        if (config.env === 'test') {
            this.applyTestEnv();
        }
        this.errorHandlers();
    }
    Application.prototype.middleware = function () {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(cookieParser());
        this._app.use(compression());
        this._app.use(methodOverride());
        this._app.use(helmet());
        this._app.use(cors());
    };
    Application.prototype.routes = function () {
        this._app.use('/api', index);
    };
    Application.prototype.applyDevEnv = function () {
        this._app.use(morgan('dev'));
        expressWinston.requestWhitelist.push('body');
        expressWinston.responseWhitelist.push('body');
        this._app.use(expressWinston.logger({
            winstonInstance: winston,
            meta: true,
            msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
            colorStatus: true
        }));
    };
    Application.prototype.applyTestEnv = function () {
        this._app.use(expressWinston.errorLogger({
            winstonInstance: winston
        }));
    };
    Application.prototype.errorHandlers = function () {
        this._app.use(function (err, req, res, next) {
            if (err) {
                return (err);
            }
        });
        this._app.use(function (req, res, next) {
            var err = new APIError_1.APIError('API not found', httpStatus.NOT_FOUND);
            return next(err);
        });
        this._app.use(function (err, req, res, next) {
            return (res.status(err.status).json({
                message: err.isPublic ? err.message : httpStatus[err.status],
                stack: config.env === 'development' ? err.stack : {}
            }));
        });
    };
    Application.prototype.listen = function (port, env) {
        this._app.listen(port, function () {
            console.log("Server started on port " + port + " (" + env + ")");
        });
    };
    Object.defineProperty(Application.prototype, "server", {
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=express.js.map