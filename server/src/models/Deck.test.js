/* eslint-disable semi */
/* eslint-disable quotes */
const { describe, it, expect, beforeAll, afterEach } = require("@jest/globals");
const { User, Deck, Card } = require("./index.js");
const { db } = require("../db/config.js");

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterEach(async () => await db.truncate({ cascade: true }));

describe("The Deck Model", () => {
  it("creates a Deck", async () => {
    const deck = await Deck.create({ name: "Fire", xp: 150 });

    expect(deck).toBeInstanceOf(Deck);
    expect(deck.name).toBe("Fire");
  });

  it("finds a Deck", async () => {
    await Deck.create({ name: "Fire", xp: 150 });
    const deck = await Deck.findOne({ where: { name: "Fire" } });

    expect(deck).toBeInstanceOf(Deck);
    expect(deck.name).toBe("Fire");
  });

  it("updates a Deck", async () => {
    let deck = await Deck.create({ name: "Fire", xp: 150 });
    deck = await deck.update({ name: "Water" });

    expect(deck.name).toBe("Water");
  });

  it("deletes a Deck", async () => {
    // Arrange
    let deck = await Deck.create({ name: "Fire", xp: 150 });
    // Act
    await deck.destroy();
    deck = await Deck.findByPk(deck.id);

    // Assert
    expect(deck).toBeNull();
  });

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

  describe("One-to-Many Association", () => {
    it("Each Deck may contain many Cards", async () => {
      const deck = await Deck.create({ name: "Water", xp: 75 });
      const allCards = await Card.bulkCreate([
        {
          name: "Arcturus Spellweaver",
          mojo: 100,
          stamina: 10,
          imgUrl: "http://localhost:5000/img/arcturus-spellweaver.jpg",
        },
        {
          name: "Theron Thunderstrike",
          mojo: 100,
          stamina: 10,
          imgUrl: "http://localhost:5000/img/theron-thunderstrike.jpg",
        },
      ]);

      await deck.setCards(allCards);
      const finalDeck = await deck.getCards();
      // console.log(JSON.stringify(finalDeck, null, 2));
      expect(finalDeck.length).toBe(2);
      expect(finalDeck).toEqual(
        expect.arrayContaining(
          allCards.map((card) =>
            expect.objectContaining({
              id: card.id,
              name: card.name,
              mojo: card.mojo,
              stamina: card.stamina,
              imgUrl: card.imgUrl,
            })
          )
        )
      );
    });
  });
});
