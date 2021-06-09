import User from "../../../js/models/user.js";
import { postLogin, postSignup } from "../../../js/services/users.js";
import { describe, expect, test, jest } from "@jest/globals";

// Setup mocks for Domain layer
jest.mock("../../../js/models/user.js");

describe("Users Service Unit Tests", () => {
  // User - Signup
  test("User Signup Route", async () => {
    expect.assertions(19);

    // Master Password - Unauthorized
    let res = {
      status: function (resStatus) {
        return {
          send: function (resBody) {
            expect(resStatus).toBe(400);
            expect(resBody.err).toBe("Unauthorized");
          },
        };
      },
    };
    let req = {
      body: {},
    };
    await postSignup(req, res);

    // Master Password - Authorized
    res = {
      status: function (resStatus) {
        return {
          send: function (resBody) {
            expect(resBody.err).not.toBe("Unauthorized");
          },
        };
      },
    };
    req = {
      body: {
        masterPassword: "345",
      },
    };
    await postSignup(req, res);

    // Parameter validation - Missing
    res = {
      status: function (resStatus) {
        return {
          send: function (resBody) {
            expect(resStatus).toBe(400);
            expect(resBody.err).toBe(
              "Please enter username, password, email and role"
            );
          },
        };
      },
    };

    const testParam = async function (param) {
      req = {
        body: {
          masterPassword: "345",
          username: "sadfasdf",
          password: "fsds",
          email: "aaa@ggg.c",
          role: "player",
          idUserNum: "92837423",
        },
      };

      req.body[param] = undefined;
      await postSignup(req, res);
    };
    await testParam("username");
    await testParam("password");
    await testParam("email");
    await testParam("role");
    await testParam("idUserNum");

    // Register - Domain Error
    res = {
      status: function (resStatus) {
        return {
          send: function (resBody) {
            expect(resStatus).toBe(400);
            expect(resBody.err).not.toBe(null);
            expect(User.lastLogin).toStrictEqual({});
          },
        };
      },
    };
    req = {
      body: {
        masterPassword: "345",
        username: "fail",
        password: "fsds",
        email: "aaa@ggg.c",
        role: "player",
        idUserNum: "92837423",
      },
    };
    await postSignup(req, res);

    // Valid Register
    res = {
      status: function (resStatus) {
        return {
          send: function (resBody) {
            expect(resStatus).toBe(200);
            expect(resBody.err).toBe(null);
            expect(User.lastRegistered).toStrictEqual({
              username: "sadfasdf",
              password: "fsds",
              email: "aaa@ggg.c",
              role: "player",
              idUserNum: "92837423",
            });
          },
        };
      },
    };
    req = {
      body: {
        masterPassword: "345",
        username: "sadfasdf",
        password: "fsds",
        email: "aaa@ggg.c",
        role: "player",
        idUserNum: "92837423",
      },
    };
    await postSignup(req, res);
  });

  // User - Login
  test("User Login Route", async () => {
    expect.assertions(11);
    // Parameter validation - Missing
    let res = {
      status: function (resStatus) {
        return {
          send: function (resBody) {
            expect(resStatus).toBe(400);
            expect(resBody.err).toBe("Please enter username and password");
          },
        };
      },
    };

    let req = {
      body: {
        username: "user",
      },
    };
    await postLogin(req, res);

    req = {
      body: {
        password: "pass",
      },
    };
    await postLogin(req, res);

    // Valid Login - Invalid credentials
    res = {
      status: function (resStatus) {
        return {
          send: function (resBody) {
            expect(resStatus).toBe(400);
            expect(resBody.err).toBe("Invalid Username or Password");
            expect(User.lastRegistered).toStrictEqual({
              username: "sadfasdf",
              password: "fsds",
              email: "aaa@ggg.c",
              role: "player",
              idUserNum: "92837423",
            });
          },
        };
      },
    };
    req = {
      body: {
        username: "fail",
        password: "fail",
      },
    };
    await postLogin(req, res);

    // Valid Login - Valid credentials
    res = {
      status: function (resStatus) {
        return {
          send: function (resBody) {
            expect(resStatus).toBe(200);
            expect(resBody.err).toBe(undefined);
            expect(User.lastLogin).toStrictEqual({
              username: "success",
              password: "test",
            });
            expect(resBody.token).toEqual(
              expect.stringMatching(
                /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
              )
            );
          },
        };
      },
    };
    req = {
      body: {
        username: "success",
        password: "test",
      },
    };
    await postLogin(req, res);
  });
});