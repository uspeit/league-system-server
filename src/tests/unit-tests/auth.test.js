import { verifyUserToken } from "../../js/auth.js";
import User from "../../js/models/user.js";
import { describe,test, expect, jest } from "@jest/globals";

describe("User Authentication Unit Tests", () => {
  // Auth - Verify Token
  test("Auth - Verify User Token", (done) => {
    jest.spyOn(User, 'getById').mockImplementation((id, callback) => {
      callback({
        userId: id
      }, null)
    })
    const token = {
      sub: 1
    }
    verifyUserToken(token, function (err, user) {
      expect(user.userId).toBe(1)
      expect(err).toBe(null)
      done()
    })
  });

    // Auth - Handle error
    test("Auth - Verify User Token", (done) => {
      jest.spyOn(User, 'getById').mockImplementation((id, callback) => {
        callback(null , "Invalid Username or Password")
      })
      const token = {
        sub: 1
      }
      verifyUserToken(token, function (err, user) {
        expect(user).toBe(false)
        expect(err).toBe("Invalid Username or Password")
        done()
      })
    });

    // Auth - Handle unknown error
    test("Auth - Verify User Token", (done) => {
      jest.spyOn(User, 'getById').mockImplementation((id, callback) => {
        callback(null , null)
      })
      const token = {
        sub: 1
      }
      verifyUserToken(token, function (err, user) {
        expect(user).toBe(false)
        expect(err).toBe(null)
        done()
      })
    });
});
