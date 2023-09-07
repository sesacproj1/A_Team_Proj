const MyLetter = (Sequelize, DataTypes) => {
  const myLetter = Sequelize.define(
    'myLetter',
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
      tableName: 'myLetter',
      freezeTableName: true,
      timestamps: false,
    }
  );
  return myLetter;
};

module.exports = MyLetter;
