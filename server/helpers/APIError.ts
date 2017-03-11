import * as httpStatus from 'http-status';

class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = (<any>this.constructor).name;
    this.message = message;
    (<any>this).status = status;
    (<any>this).isPublic = isPublic;
    (<any>this).isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, (<any>this.constructor).name);
  }
}

export class APIError extends ExtendableError {

  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);
  }
}