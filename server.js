// Import necessary modules
const resolvers = require("./graphQL/resolvers/resolvers");
const { typeDefs } = require("./graphQL/typeDefs/typeDefs");
const serverles = require("serverless-http");

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// Import models
const models = require("./sequelize/models/index");
const sequelize = require("./sequelize/sequelizeConector");
// Function to initialize the database connection
const initializeDatabase = async () => {
  try {
    // Authenticate to the database
    await sequelize.authenticate();
    console.log("Successfully authenticated to the database");

    // Sync the database
    await models.sequelize.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Create a new Express app
const app = express();

app.get("/", (req, res) => res.send("{Oasis graph api challenge}"));

// Function to initialize the Apollo Server
const initializeServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { models };
    },
  });
  // Start the Apollo Server and apply middleware
  await server.start();
  server.applyMiddleware({ app });
  app.use("*", (req, res) => res.send("{404 no encotrado.}"));
  // Start the Express server
  app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(
      "Server started at http://localhost:" +
        process.env.SERVER_PORT +
        server.graphqlPath
    );
    console.log(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_HOST,
      process.env.DB_PASS
    );
  });
};

// Initialize the database and server
initializeDatabase().then(() => {
  initializeServer();
});
module.exports.handler = serverles(app);
