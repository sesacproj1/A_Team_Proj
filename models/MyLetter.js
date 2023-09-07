const MyLetter = (Sequelize, DataTypes) => {
  const myLetter = Sequelize.define(
    'MyLetter',
    {
      letterNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'MyLetter',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return myLetter;
};

module.exports = MyLetter;
