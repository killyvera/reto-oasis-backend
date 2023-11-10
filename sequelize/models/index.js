const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const mysql2 = require("mysql2");
dotenv.config({ path: "./.env" });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    port: 3306,
  }
);

const models = require("./models");

module.exports = {
  sequelize,
  models,
};
