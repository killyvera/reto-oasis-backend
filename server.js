// Import necessary modules
import resolvers from "./graphQL/resolvers/resolvers";
import { typeDefs } from "./graphQL/typeDefs/typeDefs";
import { sequelize } from "./sequelize/models/index";

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// Import models
const models = require("./sequelize/models/index");

// Function to initialize the database connection
const initializeDatabase = async () => {
  try {
    // Authenticate to the database
    await models.sequelize.authenticate();
    console.log(models + "------------------------auth OK");
    console.log("Successfully authenticated to the database");

    // Sync the database
    await models.sequelize.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.log(models + "------------------------auth FAIL");
    console.error("Unable to connect to the database:", error);
  }
};

// Function to initialize the Apollo Server
const initializeServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { models };
    },
  });
  console.log('Apollo ON')
  //   const server = new ApolloServer({ typeDefs, resolvers, context: { models } });

  // Create a new Express app
  const app = express();

  // Start the Apollo Server and apply middleware
  await server.start();
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: 5000 }, () => {
    console.log("Server started at http://localhost:5000" + server.graphqlPath);
  });
};

// Initialize the database and server
initializeDatabase().then(() => {
  initializeServer();
});
