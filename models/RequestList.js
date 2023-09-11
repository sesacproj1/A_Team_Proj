const RequestList = (Sequelize, DataTypes) => {
  const requestList = Sequelize.define(
    'requestList',
    {
      requestId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '요청 목록 아이디',
      },
    },
    {
      tableName: 'requestList',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return requestList;
};

module.exports = RequestList;
