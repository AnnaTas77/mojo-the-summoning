/* eslint-disable semi */
/* eslint-disable quotes */
const { describe, it, expect, beforeAll, afterEach } = require("@jest/globals");
const { Card, Deck } = require("./index.js");
const { db } = require("../db/config.js");

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterEach(async () => await db.truncate({ cascade: true }));

describe("The Card Model", () => {
  it("creates a Card", async () => {
    const card = await Card.create({
      name: "Arcturus Spellweaver",
      mojo: 100,
      stamina: 10,
      imgUrl: "http://localhost:5000/img/arcturus-spellweaver.jpg",
    });

    expect(card).toBeInstanceOf(Card);
    expect(card.name).toBe("Arcturus Spellweaver");
  });

  it("finds a Card", async () => {
    await Card.create({
      name: "Arcturus Spellweaver",
      mojo: 100,
      stamina: 10,
      imgUrl: "http://localhost:5000/img/arcturus-spellweaver.jpg",
    });
    const card = await Card.findOne({
      where: { name: "Arcturus Spellweaver" },
    });

    expect(card).toBeInstanceOf(Card);
    expect(card.name).toBe("Arcturus Spellweaver");
  });

  it("updates a Card", async () => {
    let card = await Card.create({
      name: "Arcturus Spellweaver",
      mojo: 100,
      stamina: 10,
      imgUrl: "http://localhost:5000/img/arcturus-spellweaver.jpg",
    });
    card = await card.update({ name: "Lirien Moonshadow" });

    expect(card.name).toBe("Lirien Moonshadow");
  });

  it("deletes a Card", async () => {
    // Arrange
    let card = await Card.create({
      name: "Arcturus Spellweaver",
      mojo: 100,
      stamina: 10,
      imgUrl: "http://localhost:5000/img/arcturus-spellweaver.jpg",
    });
    // Act
    await card.destroy();
    card = await Card.findByPk(card.id);

    // Assert
    expect(card).toBeNull();
  });

  describe("One-to-Many Association", () => {
    it("A Card may only belong to one Deck", async () => {
      let card = await Card.create({
        name: "Arcturus Spellweaver",
        mojo: 100,
        stamina: 10,
        imgUrl: "http://localhost:5000/img/arcturus-spellweaver.jpg",
      });

      const deck1 = await Deck.create({ name: "Fire", xp: 150 });
      const deck2 = await Deck.create({ name: "Water", xp: 75 });

      await card.setDeck(deck1);
      await card.setDeck(deck2);
      card = await Card.findByPk(card.id);
      const finalDeck = await card.getDeck();

      // console.log("Card: ", card.toJSON());
      // console.log("finalDeck: ", finalDeck.toJSON());

      expect(finalDeck.id).toBe(card.DeckId);
    });
  });
});
