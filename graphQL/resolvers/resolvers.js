const { GraphQLJSON } = require("graphql-type-json");
const { default: models } = require("../../sequelize/models");

module.exports = {
  Query: {
    deserts: async () => {
      console.log(models, "--------------");
      return await models.desert.findAll({
        include: [models.oasis],
      });
    },
    desert: async (_, { id }) => {
      return await models.desert.findByPk(id);
    },
    oases: async () => {
      const oasises = await models.oasis.findAll();
      return oasises.map((oasis) => ({
        ...oasis.toJSON(),
        createdAt: formatDate(oasis.createdAt),
        updatedAt: formatDate(oasis.createdAt),
      }));
    },
    oasis: async (_, { id }) => {
      return await models.oasis.findByPk(id);
    },
  },
  Mutation: {
    createDesert: async (_, { input }) => {
      return await models.desert.create(input);
    },
    updateDesert: async (_, { id, input }) => {
      const desert = await models.desert.findByPk(id);
      if (!desert) {
        throw new Error("Desert not found");
      }
      return await desert.update(input);
    },
    deleteDesert: async (_, { id }) => {
      const desert = await models.desert.findByPk(id);
      if (!desert) {
        throw new Error("Desert not found");
      }
      await desert.destroy();
      return desert;
    },
    createOasis: async (_, { input }) => {
      return await models.oasis.create(input);
    },
    updateOasis: async (_, { id, input }) => {
      const oasis = await models.oasis.findByPk(id);
      if (!oasis) {
        throw new Error("Oasis not found");
      }
      return await oasis.update(input);
    },
    deleteOasis: async (_, { id }) => {
      const oasis = await models.oasis.findByPk(id);
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

// Helper function to format dates
const formatDate = (date) => {
  return date.toISOString();
};
