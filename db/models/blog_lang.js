const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blog_lang', {
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
        model: 'blog',
        key: 'id'
      }
    },
    lang: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    subtitle: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'blog_lang',
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
        name: "uniqridlang",
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
