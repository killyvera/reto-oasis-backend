import { TestConection } from "./sequelize/models/index";
const models = require("./sequelize/models/index");
// TestConection();
models.sequelize.authenticate().then(() => {
    console.log("auth correctly to oasis db")
});
models.sequelize.sync()