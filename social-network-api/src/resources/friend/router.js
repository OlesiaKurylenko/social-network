import { Router } from 'express'
import FriendController from "./controller"
import { AddFriendSchema } from "./schema"
import Validator from "../../middleware/validator";

const privateRouter = Router();
const controller = new FriendController()
const { validate } = new Validator();
const paramId = 'userId'
const paramId2 = 'friendId'

privateRouter.get('/friends/:userId', validate({ paramId }), controller.getFriends)
privateRouter.put('/friend', validate({ schema: AddFriendSchema }), controller.addFriend)
privateRouter.delete('/friends/:userId/:friendId', validate({ paramId, paramId2 }), controller.deleteFriend)

export default privateRouter;