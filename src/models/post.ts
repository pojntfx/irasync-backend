export default (sequelize, DataTypes) => {

  const Post = sequelize.define("post", {
    text: {
      type: DataTypes.STRING,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.Community, {
      foreignKey: {
        field: "community_id",
        name: "communityId",
      },
    });
    Post.belongsTo(models.User, {
      foreignKey: {
        field: "user_id",
        name: "userId",
      },
    });
  };

  return Post;
};
