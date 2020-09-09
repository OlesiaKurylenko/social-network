import BaseResponse from "./base-response";
import btoa from "btoa";
import atob from "atob";
import ValidationError from "../response-errors/validation-error";
import AuthService from "../resources/auth/service";

export default class BasicAuthMiddleware {
  check = async (req, res, next) => {
    const token = await this.getToken(req);
    try {
      let user = await this.decode(token);
      if (user && user.hasOwnProperty('login') && user.hasOwnProperty('password')) {
        let result = await AuthService.verify(user['login'], user['password']);
        if (!result)
        throw new ValidationError(500, '', 'user not found 1');
       return true;
      }
      else {
        throw new ValidationError(500, '', 'user not found');
      }
    } catch (e) {
      throw e;
    }
  };
  getToken = async ({ headers: { authorization } }) => {
    return authorization && authorization.replace("Basic ", "");
  };

  decode = async token => {
    const info = (atob(token)).split(":");
    return ({login:info[0], password: info[1]})
  };

  generateToken = async (login, password) => {
    return btoa(`${login}:${password}`);
  }
}
