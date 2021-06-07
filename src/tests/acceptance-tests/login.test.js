// we will use supertest to test HTTP requests/responses
import request from "supertest";
// we also need our app for the correct routes!
import server from "../../js/server.js";

import { describe, expect, it, beforeAll } from "@jest/globals";
import initDb from "../../js/data/init.js";

describe("Login Use Case", () => {
  // Success
  it("Login Success", async () => {
    await initDb(true);
    const response = await request(server)
      .post("/users/login")
      .send({
        username: "rep",
        password: "123",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    console.log(response.body);
    expect(response.body.token).toEqual(
      expect.stringMatching(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
      )
    );
  });

  // Fail
  it("Login Fail", async () => {
    await initDb(true);
    const response = await request(server)
      .post("/users/login")
      .send({
        username: "rep",
        password: "1234",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    console.log(response.body);
    expect(response.body.token).toBe(undefined);
    expect(typeof response.body.err).toBe("string");
    expect(response.body.err.length).toBeGreaterThan(0);
  });
});
