import { Validator } from "jsonschema";
import ValidationError from "../response-errors/validation-error";
import BaseResponse from "./base-response";

const validator = new Validator();

export default class ValidationMiddleware extends BaseResponse {
  validateSchema = schema => (req, res, next) => {
    const val = validator.validate(req.body, schema);
    const { errors } = val;
    if (errors.length) {
      return this.response(
        new ValidationError(422, null, "Validation error."),
        res,
        null
      );
    }
    next();
  };
  validateSchemaQuery = schema => (req, res, next) => {
    const val = validator.validate(req.query, schema);
    const { errors } = val;
    if (errors.length) {
      return this.response(
        new ValidationError(422, null, "Validation error."),
        res,
        null
      );
    }
    next();
  };

  validateRouterParams = paramId => (req, res, next) => {
    const id = req.params[paramId];
    return Math.abs(id).toString() === id
      ? ((req[paramId] = id), next())
      : this.response(
        new ValidationError(400, null, "Route param is not valid"),
        res,
        null
      );
  };

  validate = ({ schema, paramId, query }) => {
    const targets = [];
    paramId && targets.push(this.validateRouterParams(paramId));
    schema && targets.push(this.validateSchema(schema));
    query && targets.push(this.validateSchemaQuery(schema))
    return targets;
  };
}
