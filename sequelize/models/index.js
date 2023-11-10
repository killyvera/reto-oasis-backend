const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: 8889,
  }
);

const models = require("./models");

module.exports = {
  sequelize,
  models,
};
