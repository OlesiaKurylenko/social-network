import AuthService from "./service";
import BaseResponse from "../../middleware/base-response";
import authMiddleware from "../../middleware/auth";
import * as redisClient from "../../services/redis";

export default class AuthController extends BaseResponse {
  login = async (req, res) => {
    
    const { login, password } = req.body;
    try {
      let user;
      let token;
      if (await redisClient.existsAsync(login)) {
        const rawData = await redisClient.hgetallAsync(login);
        if (password === rawData.password) {
          token = rawData.token;
            user = JSON.parse(rawData.user);
        }
      } else {
        user = await AuthService.login(login, password);
        token = await authMiddleware.generateToken(user.login, password);
        await redisClient.hmsetAsync(login, { login, token, password, user: JSON.stringify(user.dataValues) });
        await redisClient.expireAsync(login, 5000);
      }
      
      await this.response(null, res, {
        token,
        user
      });
    } catch (e) {
      console.log(e)
      await this.response(e, res, null);
    }
  };
  test = async (req, res) => {
    await this.response(null, res, {
      vasya: "vvv"
    });
  };
}
