export default (sequelize, DataTypes) => {

  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Organization, {
      foreignKey: {
        field: "user_id",
        name: "userId",
      },
      through: "member",
    });
    User.belongsToMany(models.Community, {
      foreignKey: {
        field: "user_id",
        name: "userId",
      },
      through: "community_member",
    });
  };

  return User;
};
