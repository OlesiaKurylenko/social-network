import BaseResponse from "../../middleware/base-response";
import BasicAuthMiddleware from "../../middleware/basic-auth"
import UserService from "./service";

export default class UserController extends BaseResponse {
    getUsersList = async (req, res) => {

        const { first_name, last_name, user_id } = req.query;
        console.log('getUsersList *****', first_name, last_name, user_id)
        try {
            const login = (BasicAuthMiddleware.decode(BasicAuthMiddleware.getToken(req)))[0];

            const result = await UserService.getUsersList(login, first_name, last_name, user_id)
            this.response(null, res, result)
        } catch (e) {
            console.log('getUsersList', e)
            this.response(e, res, null)
        }
    }
}