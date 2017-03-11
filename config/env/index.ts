import * as path from "path";
import * as util from "util";

let env = process.env.NODE_ENV || 'development';
let config = require('./' + env);

let defaults = {
	root: path.join(__dirname, '/..')
};

export default Object.assign( config, defaults );