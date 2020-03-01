import AuthService from "./service";
import BaseResponse from "../../middleware/base-response";
import BasicAuthMiddleware from "../../middleware/basic-auth";

export default class AuthController extends BaseResponse {
  login = async (req, res) => {
    const { login, password } = req.body;

    try {
      const user = await AuthService.login(login, password);
      const token = await BasicAuthMiddleware.generateToken(
        user.login,
        user.password
      );
      await this.response(null, res, {
        token,
        user
      });
    } catch (e) {
      await this.response(e, res, null);
    }
  };
  test = async (req, res) => {
    await this.response(null, res, {
      vasya: "vvv"
    });
  };
}
