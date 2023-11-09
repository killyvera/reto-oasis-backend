// Import necessary modules
import resolvers from "./graphQL/resolvers/resolvers";
import { typeDefs } from "./graphQL/typeDefs/typeDefs";


const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Import models
const models = require("./sequelize/models/index");

// Function to initialize the database connection
const initializeDatabase = async () => {
  try {
    // Authenticate to the database
    await models.sequelize.authenticate();
    console.log("Successfully authenticated to the database");

    // Sync the database
    await models.sequelize.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Function to initialize the Apollo Server
const initializeServer = async () => {
  // Define GraphQL schema
//   const typeDefs = gql`
//     type Query {
//       hello: String
//     }
//   `;

//   // Define resolvers for the schema
//   const resolvers = {
//     Query: {
//       hello: () => "Hello Oasis",
//     },
//   };

  // Create a new Apollo Server instance
  const server = new ApolloServer({ typeDefs, resolvers, context: { models } });

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
