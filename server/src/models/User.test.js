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

describe("The User Model", () => {
  it("creates a User", async () => {
    const user = await User.create({ username: "dumbledore" });

    expect(user).toBeInstanceOf(User);
    expect(user.username).toBe("dumbledore");
  });

  it("finds a User", async () => {
    await User.create({ username: "gandalf" });
    const user = await User.findOne({ where: { username: "gandalf" } });

    expect(user).toBeInstanceOf(User);
    expect(user.username).toBe("gandalf");
  });

  it("updates a User", async () => {
    let user = await User.create({ username: "merlyn" });
    user = await user.update({ username: "merlin" });

    expect(user.username).toBe("merlin");
  });

  it("deletes a User", async () => {
    // Arrange
    let user = await User.create({ username: "grindelwald" });

    // Act
    await user.destroy();
    user = await User.findByPk(user.id);

    // Assert
    expect(user).toBeNull();
  });

  describe("One-to-One Association", () => {
    it("User has exactly one Deck - One-to-One Association", async () => {
      let user = await User.create({ username: "ancano" });
      const deck1 = await Deck.create({ name: "Fire", xp: 150 });
      const deck2 = await Deck.create({ name: "Water", xp: 75 });

      await user.setDeck(deck1);
      // the line below overwrites the line above
      await user.setDeck(deck2);
      user = await User.findByPk(user.id);

      const finalDeck = await user.getDeck();

      expect(finalDeck.toJSON()).toEqual(deck2.toJSON());
    });
  });
});
