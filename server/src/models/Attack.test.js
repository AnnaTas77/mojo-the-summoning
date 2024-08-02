/* eslint-disable semi */
/* eslint-disable quotes */
const { describe, it, expect, beforeAll, afterEach } = require("@jest/globals");
const { Attack } = require("./index.js");
const { db } = require("../db/config.js");

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterEach(async () => await db.truncate({ cascade: true }));

describe("The Attack Model", () => {
  it("creates an Attack", async () => {
    const attack = await Attack.create({
      title: "Rainbow Slash",
      mojoCost: 75,
      staminaCost: 75,
    });

    expect(attack).toBeInstanceOf(Attack);
    expect(attack.title).toBe("Rainbow Slash");
  });

  it("finds an Attack", async () => {
    await Attack.create({
      title: "Rainbow Slash",
      mojoCost: 75,
      staminaCost: 75,
    });
    const attack = await Attack.findOne({ where: { title: "Rainbow Slash" } });

    expect(attack).toBeInstanceOf(Attack);
    expect(attack.title).toBe("Rainbow Slash");
  });

  it("updates an Attack", async () => {
    let attack = await Attack.create({
      title: "Rainbow Slash",
      mojoCost: 75,
      staminaCost: 75,
    });
    attack = await attack.update({ title: "Violent Darkness Punch" });

    expect(attack.title).toBe("Violent Darkness Punch");
  });

  it("deletes an Attack", async () => {
    // Arrange
    let attack = await Attack.create({
      title: "Rainbow Slash",
      mojoCost: 75,
      staminaCost: 75,
    });
    // Act
    await attack.destroy();
    attack = await Attack.findByPk(attack.id);

    // Assert
    expect(attack).toBeNull();
  });
});
