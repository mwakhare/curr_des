import * as winston from "winston";

let logger = new winston.Logger({
	transports: [new winston.transports.Console({
		json: true,
		colorize: true
	})]
});

export = logger;