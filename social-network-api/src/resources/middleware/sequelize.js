import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const {
  POSTGRES_DATABASE,
  POSTGRES_PORT: port,
  POSTGRES_HOST: host,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD
} = process.env;

export const sequelize = new Sequelize(
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    host,
    port,
    pool: {
      max: 10, // clarify todo
      min: 0
    },
    define: {
      engine: "InnoDB",
      paranoid: true,
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  }
);

const models = {
  user: require("../../resources/user/db_model"),
  request: require("../../resources/request/db_model"),
  friend: require("../../resources/friend/db_model")
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
