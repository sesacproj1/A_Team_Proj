const Admin = (Sequelize, DataTypes) => {
  const admin = Sequelize.define(
    'Admin',
    {
      adminId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      adminRole: {
        type: DataTypes.INTEGER,
        comment: '어드민권한',
      },
    },
    {
      tableName: 'Admin',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return admin;
};

module.exports = Admin;
