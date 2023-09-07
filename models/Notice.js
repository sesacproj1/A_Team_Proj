const Notice = (Sequelize, DataTypes) => {
  const notice = Sequelize.define(
    'Notice',
    {
      NoticeNo: {
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
      noticeTime: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '공지시간',
      },
    },
    {
      tableName: 'Notice',
      freezeTableName: true,
      timestamps: true,
    }
  );
  return notice;
};

module.exports = Notice;
