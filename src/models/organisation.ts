export default (sequelize, DataTypes) => {

  const Organisation = sequelize.define("team", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Organisation.associate = (models) => {
    Organisation.belongsToMany(models.User, {
      foreignKey: {
        field: "user_id",
        name: "userId",
      },
      through: "member",
    });
    Organisation.belongsTo(models.User, {
      foreignKey: "owner",
    });
  };

  return Organisation;
};
