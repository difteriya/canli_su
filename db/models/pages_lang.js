const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pages_lang', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pages',
        key: 'id'
      }
    },
    lang: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pages_lang',
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
        name: "uniq_pl",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rid" },
          { name: "lang" },
        ]
      },
      {
        name: "rid",
        using: "BTREE",
        fields: [
          { name: "rid" },
        ]
      },
    ]
  });
};
