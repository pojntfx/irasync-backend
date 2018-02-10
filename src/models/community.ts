export default (sequelize, DataTypes) => {

  const Community = sequelize.define("community", {
    name: {
      type: DataTypes.STRING,
    },
    public: {
      type: DataTypes.BOOLEAN,
    },
  });

  Community.associate = (models) => {
    Community.belongsTo(models.Organization, {
      foreignKey: {
        field: "organization_id",
        name: "organizationId",
      },
    });
    Community.belongsToMany(models.User, {
      foreignKey: {
        field: "community_id",
        name: "communityId",
      },
      through: "community_member",
    });
  };

  return Community;
};
