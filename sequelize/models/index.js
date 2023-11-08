import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "oasis",
  "admin",
  "mypassword",
  {
    host:"oasis-db.cwjokesjioms.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  }
);

export const TestConection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
};