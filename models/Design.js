const Design = (Sequelize, DataTypes) => {
    const design = Sequelize.define(
      "design",
      {
        designNo: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        designLocation: {
          type: DataTypes.STRING(150),
          allowNull: false,
          comment : '디자인 이미지 장소'
        },
  
        designName: {
          type: DataTypes.STRING(150),
          allowNull : false,
          comment: "디자인 이미지 이름",
        },
      },
      {
        tableName: "design",
        freezeTableName: true,
        timestamps: false,
      }
    );
    return design;
  };
  
  module.exports = Design;
  