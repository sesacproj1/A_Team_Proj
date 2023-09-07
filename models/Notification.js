const Notification = (Sequelize, DataTypes) => {
  const notification = Sequelize.define(
    'Notification',
    {
      NotificationId: {
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
      sender: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '발신자',
      },
      receiver: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '수신자',
      },
    },
    {
      tableName: 'Notification',
      freezeTableName: true,
      timestamps: true,
    }
  );
  return notification;
};

module.exports = Notification;
