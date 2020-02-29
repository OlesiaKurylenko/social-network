import Sequelize from "sequelize";
import { sequelize } from "../../middleware/sequelize";

export default class UserModel extends Sequelize.Model {}

UserModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    login: {
      type: Sequelize.STRING(120),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
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
    modelName: "user",
    underscored: true,
    paranoid: true,
    timestamps: true
  }
);
