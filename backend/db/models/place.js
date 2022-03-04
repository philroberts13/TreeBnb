'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Place.associate = function(models) {
    Place.belongsTo(models.User, { foreignKey: 'userId' });
    Place.hasMany(models.Review, { foreignKey: 'placeId' });  };
  return Place;
};
