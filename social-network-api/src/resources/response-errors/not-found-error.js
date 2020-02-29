export default class NotFoundError extends Error {
    constructor (statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
  