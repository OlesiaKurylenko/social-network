import NotFoundProvider from '../../response-errors/not-found-error'
import FriendModel from './db_model'
import DataError from '../../response-errors/database-error'

export default class FriendService {

    static async getFriends(user_id) {
        try {
            const data = await FriendModel.findAll({
                where: { user_id },
                [Op.or]: { friend_id: user_id },
                attributes: ["friend_id", "user_id"]
            })
            return data;
        }
        catch (e) {
            throw new DataError(405, e)
        }
    }
    static async addFriend({ user_id, friend_id }) {
        try {
            const finded = await FriendModel.findOne({ user_id, friend_id }, {
                where: { user_id: user_id, friend_id: friend_id },
                attributes: ["friend_id", "user_id"]
            });
            if (!finded)
                return await FriendModel.create({ user_id, friend_id });
            else {
                finded = await FriendModel.findOne({ user_id, friend_id }, {
                    where: { friend_id: userId, user_id: friend_id },
                    attributes: ["friend_id", "user_id"]
                });
                if (!finded)
                    return await FriendModel.create({ friend_id: userId, user_id: friend_id });
            }
            throw new DataError(405, 'Cannot add friende.')
        }
        catch (e) {
            throw new DataError(405, e)
        }
    }
    static async deleteFriend({ user_id, friend_id }) {
        try {
            let data = null;
            const user = await FriendModel.findOne({
                where: { user_id, friend_id },
                attributes: ["friend_id"]
            });
            if (user) {
                data = await FriendModel.destroy({
                    where: { user_id: user_id, friend_id: friend_id }
                }, { returning: true })
                return data;
            }
            else {
                const user3 = await FriendModel.findOne({
                    where: { friend_id: userId, user_id: friend_id },
                    attributes: ["friend_id"]
                });
                if (user3) {
                    data = await FriendModel.destroy({
                        where: { friend_id: userId, user_id: friend_id }
                    }, { returning: true })
                    return data;
                }
                throw new DataError(405, 'Cannot delete Friend. ')
            }
        }
        catch (e) {
            throw new DataError(405, 'Cannot delete request. ')
        }
    }

    static async deleteFriendQeury(user_id, friend_id) {
        try {
            await FriendModel.DeleteFriend(user_id, friend_id);
            return true;
        }
        catch (err) {
            throw new DataError(405, 'Cannot delete Friend. ')
        }

    }

}