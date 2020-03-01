import UserModel from "../user/db_model";

export default class AuthService {
  static async login(login, password) {
    try {
      const user = await UserModel.findOne({
        where: { login: login },
        attributes: ["first_name", "last_name", "login"]
      });
      return user;
    } catch (e) {
      throw Error(e);
    }
  }
  static async test() {
    return "user";
  }
}
