import authRouter from "./resources/auth/router";
import userRouter from "./resources/user/router";
import requestRouter from "./resources/request/router";
import friendRouter from "./resources/friend/router";

export const publicRoutes = [authRouter];
export const privateRoutes = [userRouter, requestRouter, friendRouter];
