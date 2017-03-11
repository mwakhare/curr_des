"use strict";
var mysql = require("mysql");
var env_1 = require("./env");
var pool = mysql.createPool({
    connectionLimit: 100,
    host: env_1.default.db_host,
    user: env_1.default.db_user,
    password: env_1.default.db_pass,
    database: env_1.default.db_name
});
var getConnection = function (callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("pool.getConnection error" + err);
            return callback(err);
        }
        callback(null, connection);
    });
};
module.exports = getConnection;
//# sourceMappingURL=db.service.js.map