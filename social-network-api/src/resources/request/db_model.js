import Sequelize from "sequelize";
import { sequelize } from "../../services/sequelize";
import UserModel from "../user/db_model";

export default class RequestModel extends Sequelize.Model {}

RequestModel.init(
  {
    user_id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      references: {
        model: UserModel,
        key: "id"
      },
      allowNull: false
    },
    friend_id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      references: {
        model: UserModel,
        key: "id"
      },
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "request",
    underscored: true,
    paranoid: true,
    timestamps: true
  }
);
