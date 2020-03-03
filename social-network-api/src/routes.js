import authRouter from "./resources/auth/router";
import userRouter from "./resources/user/router";

export const publicRoutes = [authRouter];
export const privateRoutes = [userRouter];
