import { Router } from "express";
import Validator from "../../middleware/validator";
import AuthController from "./controller";
import { LoginSchema } from "./schema";

const router = Router();
const authController = new AuthController();
const { validate } = new Validator();

router.post("/login", validate({ schema: LoginSchema }), authController.login);
export default router;
