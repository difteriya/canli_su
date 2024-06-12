const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delivery_note: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    delivery_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    payment_method: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    payment_status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
