/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

// create your User model here
const { db, DataTypes, Model } = require("../db/config");

class Attack extends Model {}

Attack.init(
  {
    title: DataTypes.TEXT,
    mojoCost: DataTypes.INTEGER,
    staminaCost: DataTypes.INTEGER,
  },
  {
    // pass the sequelize instance
    sequelize: db,
  }
);

module.exports = { Attack };
