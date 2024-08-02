/* eslint-disable semi */
/* eslint-disable quotes */
// MODULE AGGREGATION / BARREL MODULE

const { User } = require("./User");
const { Deck } = require("./Deck");
const { Card } = require("./Card");
const { Attack } = require("./Attack");

// import the rest of your models above

// set up the associations here

// and then export them all below
module.exports = { User, Deck, Card, Attack };
