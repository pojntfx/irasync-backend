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
    Community.belongsTo(models.Organisation, {
      foreignKey: {
        field: "organisation_id",
        name: "organisationId",
      },
    });
  };

  return Community;
};
