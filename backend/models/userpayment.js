'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserPayment.init({
    user_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPayment',
    tableName:'UserPayment'
  });
  return UserPayment;
};

