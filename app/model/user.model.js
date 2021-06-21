const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id",
      references: {
        key: "id",
        model: "tb_entity_model"
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "password"
    },
    kind: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "sistema",
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "kind"
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "salt"
    },
    tb_device_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tb_device_id"
    },
    active: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "S",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "active"
    },
    activation_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "activation_key"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_at"
    }
  };
  const options = {
    tableName: "tb_user",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "updated_at",
      unique: false,
      type: "BTREE",
      fields: ["updated_at"]
    }]
  };
  const UserModel = sequelize.define("tb_user_model", attributes, options);
      
  return UserModel;
};