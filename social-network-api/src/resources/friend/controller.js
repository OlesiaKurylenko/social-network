import BaseResponse from "../../middleware/base-response";
import FriendService from "./service"

export default class FriendController extends BaseResponse {
    getFriends = async (req, res) => {
        try {
            const { userId } = req
            const data = await FriendService.getFriends(userId)
            await this.response(null, res, data)
        } catch (e) {
            await this.response(e, res, null)
        }
    }
    addFriend = async (req, res) => {
        try {
            const body = req.body;
            const data = await FriendService.addFriens(body)
            await this.response(null, res, data)
        } catch (e) {
            await this.response(e, res, null)
        }
    }
    deleteFriend = async (req, res) => {
        try {
            const { user_id, } = req
            const { friend_id } = req.params
            const data = await FriendService.deleteFriendQeury(user_id, friend_id)
            await this.response(null, res, data)
        } catch (e) {
            await this.response(e, res, null)
        }
    }
}