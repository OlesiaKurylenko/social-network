import BaseResponse from "./base-response";
import btoa from "btoa";
import atob from "atob";

export default class BasicAuthMiddleware extends BaseResponse {
  check = async (req, res, next) => {
    const token = getToken(req);
    try {
      this.decode(token);
      next();
    } catch (e) {
      this.response(e, res, null);
    }
  };
  getToken = ({ headers: { authorization } }) => {
    return authorization && authorization.replace("Basic ", "");
  };

  decode = token => {
    const res = atob(token).split(process.env.BASIC_SPLIT.toString());
  };
  static generateToken(login, password) {
    return btoa(`${login}${process.env.BASIC_SPLIT.toString()}${password}`);
  }
}
