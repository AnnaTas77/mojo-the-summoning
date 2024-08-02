/* eslint-disable semi */
/* eslint-disable quotes */
const { describe, it, expect, beforeAll, afterEach } = require("@jest/globals");
const { User, Deck } = require("./index.js");
const { db } = require("../db/config.js");

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterEach(async () => await db.truncate({ cascade: true }));

describe("The Deck Model", () => {
  describe("One-to-One Association", () => {
    it("Deck has exactly one User - One-to-One Association", async () => {
      let deck = await Deck.create({ name: "Water", xp: 75 });
      const user1 = await User.create({ username: "gandalf" });
      const user2 = await User.create({ username: "merlin" });

      await deck.setUser(user1);
      // the line below overwrites the line above
      await deck.setUser(user2);
      deck = await Deck.findByPk(deck.id);

      const finalUser = await deck.getUser();

      expect(finalUser.toJSON()).toEqual(user2.toJSON());
    });
  });
});
