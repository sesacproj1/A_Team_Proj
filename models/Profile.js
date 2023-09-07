const Profile = (Sequelize, DataTypes) => {
  const profile = Sequelize.define(
    'Profile',
    {
      profileNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      profileLocation: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: '저장 주소',
      },
      profileName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '변경 파일 이름',
      },
    },
    {
      tableName: 'Profile',
      freezeTableName: true,
      timestamps: true,
    }
  );
  return profile;
};

module.exports = Profile;
