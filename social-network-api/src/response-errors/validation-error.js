export default class ValidationError extends Error {
    constructor (statusCode, fields, message) {
      super()
      this.statusCode = statusCode
      this.fields = fields
      this.message = message
    }
}
  