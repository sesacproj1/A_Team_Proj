const toFriend = (Sequelize, DataTypes) => {
  const tofriend = Sequelize.define(
    'tofriend',
    {
      toFriendNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toFriendUserId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '요청받은 사람의 친구목록 아이디',
      },
    },
    {
      tableName: 'toFriend',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return tofriend;
};

module.exports = toFriend;
