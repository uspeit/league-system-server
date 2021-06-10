import { UserData } from "../../../js/data/user.js";
import User from "../../../js/models/user.js";
import { describe, expect, it, beforeEach, jest } from "@jest/globals";

// Setup mocks for Data layer

describe("User Model Integration Tests", () => {
  beforeEach(async () => {
    await UserData.sync({ force: true });
    let user = await UserData.create({
      username: "test",
      password: "qwe123",
      idUserNum: "123",
      email: "test@mail.com",
      role: "representative",
    });
    await user.save();

    let refereeUser = await UserData.create({
      username: "test2",
      password: "123qwe",
      idUserNum: "12",
      email: "test2@mail.com",
      role: "referee",
    });
    await refereeUser.save();
  })

  // User - Register
  it("User - Register", async () => {
    let error = await User.register(
      "test3",
      "asdzxc",
      123456789,
      "test3@mail.com",
      "player"
    );
    let user = await UserData.findOne({ where: { username: "test3" } });

    expect(error).toBe(null);
    expect(user).not.toBe(null);
    expect(user.username).toBe("test3");
    expect(user.password).toBe("asdzxc");
    expect(user.email).toBe("test3@mail.com");

    error = await User.register(
      "test3",
      "asdzxc",
      123836789,
      "test3@mail.com",
      "player"
    );
    expect(error).not.toBe(null);

    error = await User.register(
      "aaaaaa",
      "asdzxc",
      123486389,
      "test3@mail.com",
      "player"
    );
    expect(error).not.toBe(null);

    error = await User.register(
      "test3",
      "asdzxc",
      123456439,
      "aaaaaaaa@mail.com",
      "player"
    );
    expect(error).not.toBe(null);

    // Invalid role
    error = await User.register(
      "bbbbbbb",
      "asdzxc",
      123456439,
      "bbbbbbbbb@mail.com",
      "invalid"
    );
    expect(error).not.toBe(null);
  });

  // User - Login
  it("User - Login", async () => {
    let token = await User.login("test", "qwe123");
    // Pass
    expect(token.sub).toBeGreaterThan(0); // Check we got a valid id
    // Fail
    token = await User.login("test", "qwe1234");
    expect(token).toBe(null);
  });

  // User - Get by ID
  it("User - Get by ID", async () => {
    const getByIdAsync = function (id) {
      return new Promise(function (resolve, reject) {
        User.getById(id, function (user, err) {
          resolve(user);
        });
      });
    };

    let user = await getByIdAsync(1);
    expect(user.username).toBe("test");
    expect(user.password).toBe("qwe123");
    expect(user.email).toBe("test@mail.com");

    user = await getByIdAsync(2);
    expect(user.username).toBe("test2");
    expect(user.password).toBe("123qwe");
    expect(user.email).toBe("test2@mail.com");

    user = await getByIdAsync(5);
    expect(user).toBe(null);
  });
});
