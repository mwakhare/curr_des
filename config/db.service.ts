import * as mysql from "mysql";
import config from './env';


/**
 * mysql.createPool () creates the database connection pool
 *
 * @param <string> database host name
 * @param <string> database user name
 * @param <string> database password
 * @param <string> database name
 * @return null or database connection object
 */	
let pool  = mysql.createPool({
    connectionLimit : 100, //max limit to fix.
    host     : (<any>config).db_host,
    user     : (<any>config).db_user,
    password : (<any>config).db_pass,
    database : (<any>config).db_name
});


/**
 * getConnection () establishes the database connection
 *
 * @param <function> callback (err, connection)
 * @return null or database connection object
 */	
let getConnection = (callback) => {
    pool.getConnection( (err, connection) => {
        if(err) 
        {
            console.log("pool.getConnection error" + err);
            return callback(err);
        }
        callback(null, connection);
    });
};

export = getConnection;