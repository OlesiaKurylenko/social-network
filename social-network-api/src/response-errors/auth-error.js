export default class AuthError extends Error {
    constructor (statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  