/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

// create your User model here
const { db, DataTypes, Model } = require("../db/config");

class Card extends Model {}

Card.init(
  {
    name: DataTypes.TEXT,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgUrl: DataTypes.TEXT,
  },
  {
    // pass the sequelize instance
    sequelize: db,
  }
);

module.exports = { Card };
