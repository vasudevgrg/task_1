'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Section, {
        foreignKey: 'section_id',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Address,{
        foreignKey:'user_id',
        onDelete:"CASCADE"
      });
      User.belongsToMany(models.Payment,{
        through:'UserPayment',
        foreignKey:'payment_id',
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    qualification: DataTypes.STRING,
    section_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName:'User'
  });
  return User;
};