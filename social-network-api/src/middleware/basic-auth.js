import BaseResponse from "./base-response";
import btoa from "btoa";
import atob from "atob";
import { ValidationError } from "../response-errors/validation-error";
import AuthService from "../resources/auth/service";

export default class BasicAuthMiddleware extends BaseResponse {
  check = async (req, res, next) => {
    const token = BasicAuthMiddleware.getToken(req);
    try {
      let user = BasicAuthMiddleware.decode(token);
      if (user && user.length === 2) {
        let res = await AuthService.verify(user[0], user[1])
        if (!res)
          this.response(new ValidationError(500, '', 'user not found'), res, null);
        next();
      }
      else {
        this.response(new ValidationError(500, '', 'user not found'), res, null);
      }
    } catch (e) {
      this.response(e, res, null);
    }
  };
  static getToken = ({ headers: { authorization } }) => {
    return authorization && authorization.replace("Basic ", "");
  };

  static decode = token => {
    return (atob(token)).split(":");
  };
  static generateToken(login, password) {
    return btoa(`${login}:${password}`);
  }
}
