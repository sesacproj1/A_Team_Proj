const Notice = (Sequelize, DataTypes) => {
  const notice = Sequelize.define(
    'notice',
    {
      noticeNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      noticeHeader: {
        type: DataTypes.STRING(150),
        allowNull: false,
        comment: '공지제목',
      },
      noticeContent: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        comment: '공지내용',
      },
    },
    {
      tableName: 'notice',
      freezeTableName: true,
      timestamps: true,
    }
  );
  return notice;
};

module.exports = Notice;
