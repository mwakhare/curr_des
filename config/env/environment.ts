export default class Environment {
	constructor(private _env: string, private _MYSQL_DEBUG: boolean, 
				private _jwt_secret: string, 
				private _app_port: number = 4040,
				private _db_host: string, private _db_name: string, 
				private _db_user: string, private _db_pass: string, 
				private _db_port: number = 3306) {

	}

	public get env(): string { return this._env };
	public get MYSQL_DEBUG(): boolean { return this._MYSQL_DEBUG };
	public get jwt_secret(): string { return this._jwt_secret };
	public get db_host(): string { return this._db_host };
	public get db_name(): string { return this._db_name };
	public get db_user(): string { return this._db_user };
	public get db_pass(): string { return this._db_pass };
	public get db_port(): number { return this._db_port };
	public get app_port(): number {return this._app_port};
}

