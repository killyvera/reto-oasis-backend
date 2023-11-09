// code a
module.exports = (sequelize, DataTypes) => {
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
    Desert.associate = function (models) {
      Desert.hasMany(models.Oasis);
    };
    return Desert;
  };

// code b
module.exports = (sequelize, DataTypes) => {
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

  Oasis.associate = function (models) {
    Oasis.belongsTo(models.Desert, {
      foreignKey: "desertId",
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    });
  };
  return Oasis;
};