const Post = (Sequelize, DataTypes) => {
  const post = Sequelize.define(
    'Post',
    {
      PostNo: {
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
      },
      postContent: {
        type: DataTypes.Text('medium'),
        allowNull: false,
        comment: '편지내용',
      },
      postNickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '편지쓴 사람의 닉네임',
      },
      postLikes: {
        type: DataTypes.INTEGER,
        comment: '좋아요 수',
      },
      postIp: {
        type: DataTypes.STRING(150),
        allowNull: false,
        comment: '아이피 주소',
      },
    },
    {
      tableName: 'Post',
      freezeTableName: true,
      timestamps: true,
    }
  );
  return post;
};

module.exports = Post;
