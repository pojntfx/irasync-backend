export default (sequelize, DataTypes) => {

  const Organization = sequelize.define("organization", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Organization.associate = (models) => {
    Organization.belongsToMany(models.User, {
      foreignKey: {
        field: "user_id",
        name: "userId",
      },
      through: "member",
    });
    Organization.belongsTo(models.User, {
      foreignKey: "owner",
    });
  };

  return Organization;
};
