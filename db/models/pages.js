const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    alias: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: "alias"
    }
  }, {
    sequelize,
    tableName: 'pages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "alias",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "alias" },
        ]
      },
    ]
  });
};
