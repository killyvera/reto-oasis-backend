const Sequelize = require("sequelize");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    port: 8889,
  }
);
module.exports = sequelize;
