/* eslint-disable semi */
/* eslint-disable quotes */
// MODULE AGGREGATION / BARREL MODULE

const { User } = require("./User");
const { Deck } = require("./Deck");
const { Card } = require("./Card");
const { Attack } = require("./Attack");

// import the rest of your models above

// set up the Associations here

// One-to-One
User.hasOne(Deck);
Deck.belongsTo(User);

// One-to-Many
Deck.hasMany(Card);
Card.belongsTo(Deck);

// Many-to-Many
Card.belongsToMany(Attack, { through: "CardAttacks" });
Attack.belongsToMany(Card, { through: "CardAttacks" });

// and then export them all below
module.exports = { User, Deck, Card, Attack };
