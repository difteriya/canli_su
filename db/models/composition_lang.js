const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('composition_lang', {
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
        model: 'composition',
        key: 'id'
      }
    },
    lang: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    e_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    e_symbol: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    e_value: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'composition_lang',
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
        name: "comp_uniq",
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
