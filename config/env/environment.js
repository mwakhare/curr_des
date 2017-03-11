"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Environment = (function () {
    function Environment(_env, _MYSQL_DEBUG, _jwt_secret, _app_port, _db_host, _db_name, _db_user, _db_pass, _db_port) {
        if (_app_port === void 0) { _app_port = 4040; }
        if (_db_port === void 0) { _db_port = 3306; }
        this._env = _env;
        this._MYSQL_DEBUG = _MYSQL_DEBUG;
        this._jwt_secret = _jwt_secret;
        this._app_port = _app_port;
        this._db_host = _db_host;
        this._db_name = _db_name;
        this._db_user = _db_user;
        this._db_pass = _db_pass;
        this._db_port = _db_port;
    }
    Object.defineProperty(Environment.prototype, "env", {
        get: function () { return this._env; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Environment.prototype, "MYSQL_DEBUG", {
        get: function () { return this._MYSQL_DEBUG; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Environment.prototype, "jwt_secret", {
        get: function () { return this._jwt_secret; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Environment.prototype, "db_host", {
        get: function () { return this._db_host; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Environment.prototype, "db_name", {
        get: function () { return this._db_name; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Environment.prototype, "db_user", {
        get: function () { return this._db_user; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Environment.prototype, "db_pass", {
        get: function () { return this._db_pass; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Environment.prototype, "db_port", {
        get: function () { return this._db_port; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Environment.prototype, "app_port", {
        get: function () { return this._app_port; },
        enumerable: true,
        configurable: true
    });
    ;
    return Environment;
}());
exports.default = Environment;
//# sourceMappingURL=environment.js.map