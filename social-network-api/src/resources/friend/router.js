import { Router } from 'express'
import FriendController from "./controller"
import { AddFriendSchema } from "./schema"
import Validator from "../../middleware/validator";

const privateRouter = Router();
const controller = new FriendController()
const { validate } = new Validator();
const paramId = 'user_id'
const paramId2 = 'friend_id'

privateRouter.get('/friends/:userId', validate({ paramId }), controller.getFriends)
privateRouter.put('/friend', validate({ schema: AddFriendSchema }), controller.addFriend)
privateRouter.delete('/friends/:user_id/:friend_id', validate({ paramId }), controller.deleteFriend)

export default privateRouter;