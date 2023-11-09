import { Desert, Oasis } from "../../sequelize/models";
const { GraphQLJSON, GraphQLJSONObject } = require("graphql-type-json");

module.exports = {
  Query: {
    deserts: async () => {
      return await Desert.findAll();
    },
    desert: async (_, { id }) => {
      return await Desert.findByPk(id);
    },
    oases: async () => {
      return await Oasis.findAll();
    },
    oasis: async (_, { id }) => {
      return await Oasis.findByPk(id);
    },
  },
  Mutation: {
    createDesert: async (_, { input }) => {
      return await Desert.create(input);
    },
    updateDesert: async (_, { id, input }) => {
      const desert = await Desert.findByPk(id);
      if (!desert) {
        throw new Error("Desert not found");
      }
      return await desert.update(input);
    },
    deleteDesert: async (_, { id }) => {
      const desert = await Desert.findByPk(id);
      if (!desert) {
        throw new Error("Desert not found");
      }
      await desert.destroy();
      return desert;
    },
    createOasis: async (_, { input }) => {
      return await Oasis.create(input);
    },
    updateOasis: async (_, { id, input }) => {
      const oasis = await Oasis.findByPk(id);
      if (!oasis) {
        throw new Error("Oasis not found");
      }
      return await oasis.update(input);
    },
    deleteOasis: async (_, { id }) => {
      const oasis = await Oasis.findByPk(id);
      if (!oasis) {
        throw new Error("Oasis not found");
      }
      await oasis.destroy();
      return oasis;
    },
  },
  Desert: {
    oases: async (desert) => {
      return await desert.getOases();
    },
  },
  Oasis: {
    desert: async (oasis) => {
      return await oasis.getDesert();
    },
  },
  JSON: {
    __serialize(value) {
      return GraphQLJSON.parseValue(value);
    },
  },
};
