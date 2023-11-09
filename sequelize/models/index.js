import Sequelize from "sequelize";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const models = {
  desert: require("./models").Desert,
  oasis: require("./models").Oasis,
};
export default models;
