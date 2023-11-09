const { gql } = require("apollo-server-express");
import GraphQLJSON from "graphql-type-json";
export const typeDefs = gql`
  scalar JSON

  type Desert {
    id: ID!
    name: String
    location: JSON
    createdAt: String
    updatedAt: String
    oases: [Oasis]
  }

  type Oasis {
    id: ID!
    name: String
    location: JSON
    waterAmount: Int
    desertId: Int
    createdAt: String
    updatedAt: String
    desert: Desert
  }

  type Query {
    deserts: [Desert]
    desert(id: ID!): Desert
    oases: [Oasis]
    oasis(id: ID!): Oasis
  }

  input DesertInput {
    name: String
    location: JSON
  }

  input OasisInput {
    name: String
    location: JSON
    waterAmount: Int
    desertId: Int
  }

  type Mutation {
    createDesert(input: DesertInput): Desert
    updateDesert(id: ID!, input: DesertInput): Desert
    deleteDesert(id: ID!): Desert
    createOasis(input: OasisInput): Oasis
    updateOasis(id: ID!, input: OasisInput): Oasis
    deleteOasis(id: ID!): Oasis
  }
`;
