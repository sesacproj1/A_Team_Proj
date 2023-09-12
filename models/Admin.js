const Admin = (Sequelize, DataTypes) => {
  const admin = Sequelize.define(
    "admin",
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
        defaultValue: 0,
        comment: "어드민권한",
      },
    },
    {
      tableName: "admin",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return admin;
};

module.exports = Admin;
