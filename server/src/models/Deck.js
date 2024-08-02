/* eslint-disable semi */
/* eslint-disable comma-dangle */
// eslint-disable-next-line quotes
const { db, DataTypes, Model } = require("../db/config");

class Deck extends Model {}

Deck.init(
  {
    name: DataTypes.TEXT,
    xp: DataTypes.INTEGER,
  },
  {
    sequelize: db,
  }
);

module.exports = { Deck };
