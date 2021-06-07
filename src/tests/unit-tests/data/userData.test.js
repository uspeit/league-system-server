import { checkUserCredentials, UserData } from "../../../js/data/user.js";
import { expect, test } from "@jest/globals";

beforeEach(async () => {
  await UserData.sync({
    force: true,
  });
  let entry = await UserData.create({
    username: "test",
    password: "qwe123",
    email: "test@mail.com",
    role: "player",
  });

  await entry.save();

  entry = await UserData.create({
    username: "test2",
    password: "123qwe",
    email: "test2@mail.com",
    role: "player",
  });

  await entry.save();
});

// User DB - Username or Email Exists
test("User - Exists", async () => {
  // Pass
  expect(await checkUserCredentials("test", "test@mail.com")).toBe(true);
  expect(await checkUserCredentials("test", null)).toBe(true);
  expect(await checkUserCredentials(null, "test@mail.com")).toBe(true);
  expect(await checkUserCredentials("test2", "test2@mail.com")).toBe(true);
  expect(await checkUserCredentials("test2", null)).toBe(true);
  expect(await checkUserCredentials(null, "test2@mail.com")).toBe(true);
  expect(await checkUserCredentials("test", "test2@mail.com")).toBe(true);
  expect(await checkUserCredentials("test2", "test@mail.com")).toBe(true);
  // Fail
  expect(await checkUserCredentials(null, null)).toBe(false);
  expect(await checkUserCredentials("test3", null)).toBe(false);
  expect(await checkUserCredentials(null, "test3@mail.com")).toBe(false);
  expect(await checkUserCredentials("test3", "test3@mail.com")).toBe(false);
});
