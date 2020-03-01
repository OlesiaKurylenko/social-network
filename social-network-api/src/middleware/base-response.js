import { DatabaseError, TimeoutError, ConnectionError } from 'sequelize';
import NotFoundError from '../response-errors/not-found-error';
import ValidationError from '../response-errors/validation-error';
import AuthError from '../response-errors/auth-error';

export default class BaseResponse extends Error {
    async response (e, response, ...data) {
      switch (e && e.constructor) {
        case DatabaseError:
        case TimeoutError:
        case ConnectionError: {
          await this.DBErrorResponse(e, response)
              break;
        }
          case NotFoundError:
              await this.notFoundResponse(e, response)
              break;
        case ValidationError:
          await this.validationErrorResponse(e, response)
          break
        case Error:
        case TypeError: {
          await this.logger(e, response)
              break;
        }
        case AuthError: 
        this.authError(e, response)
          break
        default:
          await this.successResponse(response, ...data)
      }
    }
  
    async validationErrorResponse (e, response) {
      response.status(e.statusCode).send({
        message: e.message || 'Validation Failed',
        errors: e.fields
      })
    }
  
    async successResponse (response, data) {
      response.status(200).send({
        message: 'Success',
        data
      })
    }
  
    async notFoundResponse (e, response) {
      response.status(e.statusCode).send({
        message: e.message,
        error: null
      })
    }
  
    async authError (e, response) {
      response.status(401).send({
        message: e.message,
        error: null
      })
    }
  async logger (e, response) {
    response.status(500).send({
      message: 'Server temporary unavailable',
      error: null
    })
  }
    async DBErrorResponse (e, response) {
      response.status(500).send({
        message: 'Server temporary unavailable',
      })
    }
  }