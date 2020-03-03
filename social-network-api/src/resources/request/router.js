import { Router } from 'express'
import RequestController from "./controller"
import { AddRequestSchema } from "./schema"
import Validator from "../../middleware/validator";

const privateRouter = Router();
const controller = new RequestController()
const { validate } = new Validator();
const paramId = 'user_id'

privateRouter.get('/requests/pending/:user_id', validate({ paramId }), controller.getPendingRequests)
privateRouter.get('/requests/incoming/:user_id', validate({ paramId }), controller.getIncomingRequests)
privateRouter.put('/request', validate({ schema: AddRequestSchema }), controller.addRequest)
privateRouter.put('/request/approve', validate({ schema: AddRequestSchema }), controller.approveRequest)
privateRouter.put('/request/skip', validate({ schema: AddRequestSchema }), controller.deleteRequest)

export default privateRouter;