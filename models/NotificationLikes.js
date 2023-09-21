const NotificationLikes = (Sequelize, DataTypes) => {
  const notificationLikes = Sequelize.define(
    'notificationLikes',
    {
      notificationId: {
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
      likesWho: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '좋아요한 사람',
      },
    },
    {
      tableName: 'notificationLikes',
      freezeTableName: true,
    }
  );
  return notificationLikes;
};

module.exports = NotificationLikes;
