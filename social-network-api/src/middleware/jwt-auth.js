import ValidationError from "../response-errors/validation-error";
import AuthService from "../resources/auth/service";
import jwt from 'jsonwebtoken';
const JWT_KEY = process.env.JWT_KEY;

export default class JWTAuthMiddleware {
  getLoginPassword = async (req, res, next) => {
    const token = await this.getToken(req);
    try {
      let user = await this.decode(token);
      if (user && user.hasOwnProperty('login') && user.hasOwnProperty('password')) 
          return ({ login: user['login'], password: user['password'] })
       return null;
    } catch (e) {
      throw e;
    }
  };
  getToken = async ({ headers: { authorization } }) => {
    return authorization && authorization.replace("Bearer ", "");
  };

  decode = async token => {
    return jwt.decode(token);
  };
    
  generateToken = async (login, password) => {
      return jwt.sign({ login, password }, JWT_KEY);
  }
}
