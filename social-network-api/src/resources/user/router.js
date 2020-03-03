import { Router } from "express";
import Validator from "../../middleware/validator";
import { FilterSchema } from "./schema";
import UserController from "./controller";

const router = Router();
const userController = new UserController();
const { validate } = new Validator();
router.get("/users", validate({ schema: FilterSchema, query: 'query' }), userController.getUsersList);

export default router;
