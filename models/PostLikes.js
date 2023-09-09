const PostLikes = (Sequelize, DataTypes) => {
  const postLikes = Sequelize.define(
    'postLikes',
    {
      likesNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      postNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      letterNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      likesNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '좋아요 수',
      },
    },
    {
      tableName: 'postLikes',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return postLikes;
};

module.exports = PostLikes;
