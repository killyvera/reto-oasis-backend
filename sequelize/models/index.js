const Sequelize = require("sequelize");
const path = require("path");
const dotenv = require("dotenv");

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
// console.log('user: ' + process.env.DB_USER + ' db: ' + process.env.DB_NAME)
// export const TestConection = async () => {
//   try {
//     await sequelize.authenticate().then();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   } finally {
//     await sequelize.close();
//   }
// };

export const models = {
  desert: require("./desert")(sequelize, Sequelize.DataTypes),
  oasis: require("./oasis")(sequelize, Sequelize.DataTypes),
};
