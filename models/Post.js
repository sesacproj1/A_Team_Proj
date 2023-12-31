const Post = (Sequelize, DataTypes) => {
  const post = Sequelize.define(
    'post',
    {
      postNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      letterNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '익명시 id = 0',
      },
      postContent: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
        comment: '편지내용',
      },
      postNickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '편지쓴 사람의 닉네임',
      },

      postIp: {
        type: DataTypes.STRING(150),
        allowNull: false,
        comment: '아이피 주소',
      },
      postDesign: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '편지함 디자인 번호',
      },
      pw: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '익명시 비밀번호 ',
      },
    },
    {
      tableName: 'post',
      freezeTableName: true,
      timestamps: true,
    }
  );
  return post;
};

module.exports = Post;
