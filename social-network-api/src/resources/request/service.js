import NotFoundProvider from '../../response-errors/not-found-error'
import RequestModel from './db_model'
import FriendService from '../friend/service'

export default class RequestService {
    static async getPendingRequests(user_id) {
        try {
            const data = await RequestModel.findAll({
                where: { user_id }
            })
            this.response(null, res, data)
        }
        catch (e) {
            this.response(e, res, null)
        }
    }
    static async getIncomingRequests(user_id) {
        try {
            const data = await RequestModel.findAll({
                where: { friend_id: user_id }
            })
            this.response(null, res, data)
        }
        catch (e) {
            this.response(e, res, null)
        }
    }

    static async addRequest({ user_id, friend_id }) {
        try {
            const data = await RequestModel.findOrCreate({
                where: { user_id: user_id, friend_id: friend_id },
                [Op.or]: { friend_id: userId, user_id: friend_id }
            })
            this.response(null, res, data)
        }
        catch (e) {
            this.response(e, res, null)
        }
    }
    static async deleteRequest({ user_id, friend_id }, transaction) {
        try {
            const data = await RequestModel.destroy({
                where: { user_id: user_id, friend_id: friend_id },
                [Op.or]: { friend_id: userId, user_id: friend_id }
            }, { returning: true, transaction })
            this.response(null, res, data)
        }
        catch (e) {
            this.response(e, res, null)
        }
    }
    static async approveRequest({ user_id, friend_id }) {
        let transaction
        try {
            transaction = await sequelize.transaction();
            const dataDelete = await RequestService.deleteRequest({ user_id, friend_id }, transaction);
            const data = await FriendService.addFriend({ user_id, friend_id }, transaction)
            this.response(null, res, data)
            transaction.commit()
        }
        catch (e) {
            if (transaction) {
                await transaction.rollback()
            }
            this.response(e, res, null)
        }
    }

}