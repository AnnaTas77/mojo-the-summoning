/* eslint-disable semi */
/* eslint-disable quotes */
const { describe, it, expect, beforeAll, afterEach } = require("@jest/globals");
const { User } = require("./index.js");
const { db } = require("../db/config.js");

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// clear db after tests
afterEach(async () => await db.truncate({ cascade: true }));

describe("The User model", () => {
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
});
