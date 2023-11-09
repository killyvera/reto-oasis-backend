const Sequelize = require("sequelize");

import { sequelize } from "./index";

const DataTypes = Sequelize.DataTypes

const Desert = sequelize.define(
  "Desert",
  {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "desert",
    timestamps: true,
  }
);

const Oasis = sequelize.define(
  "Oasis",
  {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    waterAmount: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    desertId: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "oasis",
    timestamps: true,
  }
);

Desert.hasMany(Oasis);
Oasis.belongsTo(Desert);

module.exports = {
  Desert,
  Oasis,
};
