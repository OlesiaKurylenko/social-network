import NotFoundProvider from '../../response-errors/not-found-error'
import RequestModel from './db_model'
import FriendModel from '../friend/db_model'
import DataError from '../../response-errors/database-error'
import { sequelize } from '../../services/sequelize'

export default class RequestService {
    static async getPendingRequests(user_id) {
        try {
            const data = await RequestModel.findAll({
                where: { user_id },
                attributes: ["friend_id", "user_id"]
            })
            return data;
        }
        catch (e) {
            throw new DataError(405, 'Cannot return pending requests')
        }
    }
    static async getIncomingRequests(user_id) {
        try {
            const data = await RequestModel.findAll({
                where: { friend_id: user_id },
                attributes: ["friend_id", "user_id"]
            })
            return data;
        }
        catch (e) {
            throw new DataError(405, 'Cannot return incoming requests')
        }
    }

    static async getPendingRequestsQuery(user_id) {
        try {

            return RequestModel.getPendingRequestsQuery(user_id);
        }
        catch (e) {
            throw new DataError(405, 'Cannot return pending requests')
        }
    }
    static async getIncomingRequestsQuery(user_id) {
        try {
            return RequestModel.getIncomingRequestsQuery(user_id)
        }
        catch (e) {
            throw new DataError(405, 'Cannot return incoming requests')
        }
    }

    static async addRequest({ user_id, friend_id }) {
        try {
            let result = null;
            const finded = await RequestModel.findOne({
                where: { user_id: user_id, friend_id: friend_id }
                , attributes: ["friend_id"]
            })
            const finded2 = await RequestModel.findOne({
                where: { friend_id: user_id, user_id: friend_id }, attributes: ["friend_id"]
            })
            if (!finded && !finded2) {
                result = await RequestModel.create({ user_id, friend_id }, { returning: true });

            }
            else {
                throw new DataError(405, 'Cannot add request. Request is exists')

            }
            return result;
        }
        catch (e) {
            throw new DataError(405, e);
        }
    }
    static async deleteRequest({ user_id, friend_id }) {
        try {
            let data = null;
            const user = await RequestModel.findOne({
                where: { user_id, friend_id },
                attributes: ["friend_id"]
            });
            if (user) {
                data = await RequestModel.destroy({
                    where: { user_id: user_id, friend_id: friend_id }
                }, { returning: true })
                return data;
            }
            else {
                const user3 = await RequestModel.findOne({
                    where: { friend_id: userId, user_id: friend_id },
                    attributes: ["friend_id"]
                });
                if (user3) {
                    data = await RequestModel.destroy({
                        where: { friend_id: userId, user_id: friend_id }
                    }, { returning: true })
                    return data;
                }
                throw new DataError(405, 'Cannot delete request. ')
            }
        }
        catch (e) {
            throw new DataError(405, 'Cannot delete request. ')
        }
    }
    static async approveRequest({ user_id, friend_id }) {
        let transaction;
        try {
            transaction = await sequelize.transaction()
            /**
             * 
             */
            const user = await RequestModel.findOne({
                where: { user_id, friend_id },
                attributes: ["friend_id"]
            });
            if (user) {
                data = await RequestModel.destroy({
                    where: { user_id: user_id, friend_id: friend_id }
                }, { returning: true, transaction })

            }
            else {
                const user3 = await RequestModel.findOne({
                    where: { friend_id: userId, user_id: friend_id },
                    attributes: ["friend_id"]
                });
                if (user3) {
                    data = await RequestModel.destroy({
                        where: { friend_id: userId, user_id: friend_id }
                    }, { returning: true, transaction })

                }
                else
                    throw new DataError(405, 'Cannot delete request. ')
            }

            /**
             * 
             */
            const finded = await FriendModel.findOne({ user_id, friend_id }, {
                where: { user_id: user_id, friend_id: friend_id },
                attributes: ["friend_id", "user_id"]
            });
            if (!finded)
                await FriendModel.create({ user_id, friend_id }, { transaction });
            else {
                finded = await FriendModel.findOne({ user_id, friend_id }, {
                    where: { friend_id: userId, user_id: friend_id },
                    attributes: ["friend_id", "user_id"]
                });
                if (!finded)
                    await FriendModel.create({ friend_id: userId, user_id: friend_id }, { transaction });
                else {
                    throw new DataError(405, 'Cannot approve request.')
                }
            }
            await transaction.commit();
            return true;
        }
        catch (e) {
            if (transaction) {
                await transaction.rollback()
            }
            throw new DataError(405, 'Cannot approve request.')
        }
    }

    static async approveRequestQuery({ user_id, friend_id }) {

        try {
            const resultSet = await FriendModel.approveRequestQuery(user_id, friend_id)
            return true;
        }
        catch (e) {
            if (transaction) {
                await transaction.rollback()
            }
            throw new DataError(405, 'Cannot approve request.')
        }
    }

}