/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

// create your User model here
const { db, DataTypes, Model } = require("../db/config");

class User extends Model {}

User.init(
  {
    username: DataTypes.TEXT,
  },
  {
    sequelize: db,
  }
);

module.exports = { User };
