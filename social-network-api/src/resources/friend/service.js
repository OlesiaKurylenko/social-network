import NotFoundProvider from '../../response-errors/not-found-error'
import FriendModel from './db_model'

export default class FriendService {

    static async getFriends(user_id) {
        try {
            const data = await FriendModel.findAll({
                where: { user_id },
                [Op.or]: { friend_id: user_id }
            })
            this.response(null, res, data)
        }
        catch (e) {
            this.response(e, res, null)
        }
    }
    static async addFriend({ user_id, friend_id }, transaction) {
        try {
            const data = await FriendModel.findOrCreate({
                where: { user_id: user_id, friend_id: friend_id },
                [Op.or]: { friend_id: userId, user_id: friend_id }
            }, { returning: true, transaction })
            this.response(null, res, data)
        }
        catch (e) {
            this.response(e, res, null)
        }
    }
    static async deleteFriend({ user_id, friend_id }) {
        try {
            const data = await FriendModel.destroy({
                where: { user_id: user_id, friend_id: friend_id },
                [Op.or]: { friend_id: userId, user_id: friend_id }
            }, { returning: true })
            this.response(null, res, data)
        }
        catch (e) {
            this.response(e, res, null)
        }
    }

}