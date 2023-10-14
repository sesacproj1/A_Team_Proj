const NotificationFriends = (Sequelize, DataTypes) => {
  const notificationFriends = Sequelize.define(
    'notificationFriends',
    {
      notificationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requestWho: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '친구신청한 사람',
      },
    },
    {
      tableName: 'notificationFriends',
      freezeTableName: true,
    }
  );
  return notificationFriends;
};

module.exports = NotificationFriends;
