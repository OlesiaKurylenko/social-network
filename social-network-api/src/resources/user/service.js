
import DataError from '../../response-errors/database-error'
import UserModel from './db_model'

export default class UserService {
    static async getUsersList(login, first_name = '', last_name = '', user_id = '0') {

        const resultSet = await UserModel.getUsersList(login, first_name, last_name, user_id)
        return (resultSet)

    }
}