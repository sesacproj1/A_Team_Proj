const Friend = (Sequelize, DataTypes) => {
  const friend = Sequelize.define(
    'friend',
    {
      friendNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      friendUserId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '친구목록 아이디',
      },
    },
    {
      tableName: 'profile',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return friend;
};

module.exports = Friend;
