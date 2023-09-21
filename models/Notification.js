const Notification = (Sequelize, DataTypes) => {
  const notification = Sequelize.define(
    'notification',
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
        comment: '수신자',
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sender: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '발신자',
      },
      likeWho: {
        type: DataTypes.STRING(50),

        comment: '좋아요 누른 사람',
      },
    },
    {
      tableName: 'notification',
      freezeTableName: true,
      timestamps: true,
    }
  );
  return notification;
};

module.exports = Notification;
