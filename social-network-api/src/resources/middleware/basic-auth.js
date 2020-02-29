import BaseResponse from "./base-response"

export default class BasicAuthMiddleware extends BaseResponse {
    check = async (req, res, next) => {
        const token = getToken(req);
        try {
            this.decode(token);
            next();
        } catch (e) {
            this.response(e, res, null);
        }
    }
    getToken = ({ headers: { authorization } }) => {
        return authorization && authorization.replace('Basic ', '')
    }

    decode = (token) => {
        const tokenTo = Buffer.from(token, 'base64');
        const res = tokenTo.toString('utf8').split(process.env.BASIC_SPLIT.toString());
    }
}
