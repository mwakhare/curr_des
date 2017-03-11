import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
import * as methodOverride from "method-override";
import * as cors from "cors";
import * as httpStatus from "http-status";
import * as expressWinston from "express-winston";
import * as expressValidation from "express-validation";
import * as helmet from "helmet";
import * as winston from './winston';
import * as index from '../server/routes/index.route';
import * as config from './env';
import {APIError} from '../server/helpers/APIError';

export class Application {
	private _app;

	constructor() {
		this._app = express();
		this.middleware();
		this.routes();
		if((<any>config).env === 'development') {
			this.applyDevEnv();
		}
		if((<any>config).env === 'test') {
			this.applyTestEnv();
		}
		this.errorHandlers();
	}

	private middleware(): void {
		this._app.use(bodyParser.json());
		this._app.use(bodyParser.urlencoded({extended: false}));

		this._app.use(cookieParser());
		this._app.use(compression());
		this._app.use(methodOverride());

		this._app.use(helmet());

		this._app.use(cors());
	}

	private routes(): void {
		this._app.use('/api', index);
	}

	private applyDevEnv(): void {
		this._app.use(morgan('dev'));

		expressWinston.requestWhitelist.push('body');
		expressWinston.responseWhitelist.push('body');

		this._app.use(expressWinston.logger({
			winstonInstance: winston,
			meta: true,
			msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
			colorStatus: true
		}));
	}

	private applyTestEnv(): void {
		this._app.use(expressWinston.errorLogger({
			winstonInstance: winston
		}));
	}

	private errorHandlers(): void {
		this._app.use((err,req,res,next) => {
			if(err) {
				return(err);
				// let unifiedErrorMessage = err.errors.map((error) => {
				// 	return error.messages.join('. ');
				// }).join(' and ');
				// let error = new APIError(unifiedErrorMessage, err.status, true);
				// return next(err);
			}
		});

		this._app.use( (req,res,next) => {
			let err = new APIError('API not found', httpStatus.NOT_FOUND);
			return next(err);
		});

		this._app.use((err,req,res,next) => {
			return(
				res.status(err.status).json({
					message: err.isPublic ? err.message : httpStatus[err.status],
					stack: (<any>config).env === 'development' ? err.stack : {}
				})
			);
		});
	}

	public listen(port: number, env: string): void {
		this._app.listen(port, () => {
			console.log(`Server started on port ${port} (${env})`);
		});
	}

	public get server () {
		return this._app;
	}
}